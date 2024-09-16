'use client';
import dayjs from 'dayjs';
import { type GameQuery } from '@azuro-org/toolkit';
import { Participant, SportName } from './GameCard';
import BackCircle from './Icons/BackCircle';
import { useRouter } from 'next/navigation';

import SportIcon from './Icons/Sports';

type Props = {
  game: GameQuery['games'][0];
};

export function GameInfo(props: Props) {
  const { sport, league, participants, startsAt } = props.game;
  const router = useRouter();
  const handleBack = () => {
    router.push('/');
  };

  const BackBtn = (
    <div
      className="absolute top-0 left-0 m-4 cursor-pointer flex items-center"
      onClick={handleBack}
    >
      <BackCircle />
      <span className="ml-2 text-[14px] font-[600]">Back</span>
    </div>
  );

  return (
    <div className="flex flex-row justify-center w-full h-full rounded-[40px] pt-4 relative">
      {BackBtn}
      <div className="flex flex-col items-center pt-6 pb-8 rounded-[40px]">
        <div className="flex flex-col items-center text-md">
          <div className="mt-2 font-bold text-[16px]">
            <div className="flex items-center justify-center rounded-[12px] bg-[#FFFFFF0D] p-2 px-4 mb-4 w-fit mx-auto">
              <SportIcon sportId={sport.sportId} />
              <span className="ml-2">{sport.name}</span>
            </div>
            {league.country.name} &middot; {league.name}
          </div>
        </div>
        <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center">
          <Participant {...participants[0]} size="lg" />
          <div className="flex flex-col items-center px-[60px]">
            <div className="text-[12px] font-[500] mb-1 bg-[#FFFFFF0D] rounded-[12px] px-2 py-1">
              {dayjs(+startsAt * 1000).format('HH:mm')}
            </div>
            <div className="text-[12px] font-[500]">
              {dayjs(+startsAt * 1000).format('DD.MM.YYYY')}
            </div>
          </div>
          <Participant {...participants[1]} size="lg" />
        </div>
      </div>
    </div>
  );
}
