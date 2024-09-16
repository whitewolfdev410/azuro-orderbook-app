'use client';
import { useParams } from 'next/navigation';
import {
  useGame,
  useGameStatus
  // useBetsSummary,
  // useBetsSummaryBySelection,
  // useLiveBets,
  // usePrematchBets
} from '@azuro-org/sdk';
import { type GameQuery, GameStatus } from '@azuro-org/toolkit';
import { GameInfo, GameMarkets } from '@/components';
import { useGameMarkets, useOrderBook } from '@/hooks';

import OrderBookPage from '@/components/OrderBookPage';
import { useEffect, useState, useContext } from 'react';
import BetModal from '@/components/Modal/BetModal';
import LoadingGameInfo from '@/components/Loading/LoadingGameInfo';
import { Skeleton } from '@/components';
import GameInfoNotFound from '@/components/NotFound/GameInfoNotFound';
import BackButton from '@/components/Button/BackButton';
import BetSuccessNoti from '@/components/Noti/BetSuccessNoti';

import { ExploreContext } from '@/providers/ExploreProvider';
type MarketsProps = {
  gameId: string;
  gameStatus: GameStatus;
};

const Markets: React.FC<MarketsProps> = ({ gameId, gameStatus }) => {
  const { loading, markets } = useGameMarkets({
    gameId,
    gameStatus
  });

  const { outcomeSelected, setOutcomeSelected } = useContext(ExploreContext);

  if (loading) {
    return (
      <div className="max-w-[800px] mx-auto mt-12 space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="!w-[70px] !h-[20px]" />
            <div className="flex gap-4 mt-2 flex-col sm:flex-row sm:h-auto h-[200px]">
              {Array.from({ length: 2 }).map((_, _index) => (
                <Skeleton
                  key={_index}
                  className="flex-1 !h-[80px] rounded-xl"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!markets) {
    return null;
  }
  return (
    <>
      <BetModal
        onClose={() => {
          setOutcomeSelected(null);
        }}
        isOpen={Boolean(outcomeSelected)}
        modalBody={
          Boolean(outcomeSelected) && (
            <OrderBookPage
              markets={markets}
              outcomeSelected={outcomeSelected}
            />
          )
        }
      />

      {
        <GameMarkets
          markets={markets}
          onSelectOutcome={(outcome) => {
            setOutcomeSelected(outcome);
          }}
        />
      }
    </>
  );
};

type ContentProps = {
  game: GameQuery['games'][0];
  isGameInLive: boolean;
};

const Content: React.FC<ContentProps> = ({ game, isGameInLive }) => {
  // console.log('game', game);
  const { status: gameStatus } = useGameStatus({
    startsAt: +game.startsAt,
    graphStatus: game.status,
    isGameExistInLive: isGameInLive
  });

  // const { address } = useAccount();

  // const summary = useBetsSummary({
  //   account: address as string
  // });

  // const summaryBeSelection = useBetsSummaryBySelection({
  //   account: address as Address,
  //   gameId: game.gameId,
  //   gameStatus: GameStatus.Resolved,
  //   keyStruct: 'outcomeId'
  // });

  // const liveBets = useLiveBets({
  //   filter: {
  //     bettor: address as Address,
  //     limit: 10,
  //     offset: 0
  //   }
  // });

  // const prematchBets = usePrematchBets({
  //   filter: {
  //     bettor: address as Address,
  //     limit: 10,
  //     offset: 0
  //   }
  // });

  // console.log({
  //   // summary,
  //   // summaryBeSelection,
  //   // liveBets,
  //   // prematchBets
  // });
  return (
    <>
      <BetSuccessNoti />
      <GameInfo game={game} />
      <Markets gameId={game.gameId} gameStatus={gameStatus} />
    </>
  );
};

export default function Game() {
  const params = useParams();
  // const { clear } = useBaseBetslip();
  // useEffect(() => {
  //   clear();
  // }, []);
  const { loading, game, isGameInLive } = useGame({
    gameId: params.id as string
  });

  if (loading) {
    return <LoadingGameInfo />;
  }

  if (!game) {
    return <GameInfoNotFound />;
  }

  return <Content game={game} isGameInLive={isGameInLive} />;
}
