'use client';
import React, { useState } from 'react';
import { TGame } from '../../utils/types';
import Link from 'next/link';
import dayjs from 'dayjs';
import cx from 'clsx';
import SportIcon from '../Icons/Sports';
type GameCardProps = {
  className?: string;
  game: TGame;
};

export default function GameCard(props: GameCardProps) {
  const { className, game } = props;
  const { gameId, league, startsAt, sport, participants } = game;
  return (
    <Link href={`/event/${gameId}`}>
      <div className="hover:bg-gradient-to-l hover:from-[#ff65a6] hover:via-[#b37ed3] hover:to-[#5e64eb] p-[1px] rounded-lg h-full">
        <div
          className={cx(
            className,
            `p-4 bg-[#262a31] rounded-lg min-h-[190px] flex flex-col gap-2 h-full`
          )}
        >
          {/* <div>
            <SportName {...sport} />
          </div> */}
          <div>
            <p className="font-bold flex flex-items gap-2 overflow-hidden text-ellipsis w-full">
              <SportIcon sportId={sport.sportId} />
              {league.country.name} &middot; {league.name}
            </p>
          </div>
          <div className="flex gap-2 items-center justify-between flex-1">
            <Participant {...participants[0]} className="w-[40%]" />
            <div className="text-[10px] font-bold">
              <div className="bg-[#FFFFFF0D] rounded-lg p-1 flex items-center justify-center mb-1">
                {dayjs(+startsAt * 1000).format('HH:mm')}
              </div>
              {dayjs(+startsAt * 1000).format('DD.MM.YYYY')}
            </div>
            <Participant {...participants[1]} className="w-[40%]" />
          </div>
        </div>
      </div>
    </Link>
  );
}
const PARTICIPANT_SIZE = {
  sm: {
    img: 'w-10 h-10',
    text: 'text-[12px]'
  },
  md: {
    img: 'w-16 h-16',
    text: 'text-[14px]'
  },
  lg: {
    img: 'w-20 h-20',
    text: 'text-[16px]'
  }
};
export const Participant = (props: any) => {
  const { size = 'sm', className } = props;
  const [error, setError] = useState(false);
  const handleError = () => {
    setError(true);
  };

  return (
    <div
      //@ts-ignore
      className={`flex items-center flex-col gap-2 text-[12px] overflow-hidden ${PARTICIPANT_SIZE[size].text} ${className}`}
    >
      {error ? (
        <div
          //@ts-ignore
          className={`w-10 h-10 rounded-full border-[1px] border-blue-100 ${PARTICIPANT_SIZE[size].img}`}
        ></div>
      ) : (
        <img
          //@ts-ignore
          className={`w-10 h-10 ${PARTICIPANT_SIZE[size].img}`}
          src={props.image}
          alt={props.name}
          onError={handleError}
        />
      )}
      <p className="text-center w-full text-[16px] overflow-hidden text-ellipsis">
        {props.name}
      </p>
    </div>
  );
};
const SPORT_DATA = {
  1000: 'bg-[#FFD700] text-[#000000]', // Dota 2
  1001: 'bg-[#FF4500] text-[#FFFFFF]', // CS:GO
  1002: 'bg-[#8A2BE2] text-[#FFFFFF]', // League of Legends
  1061: 'bg-[#32CD32] text-[#FFFFFF]', // Counter-Strike 2
  28: 'bg-[#FFA500] text-[#000000]', // Baseball
  29: 'bg-[#FF0000] text-[#FFFFFF]', // Boxing
  31: 'bg-[#0000FF] text-[#FFFFFF]', // Basketball
  32: 'bg-[#ADD8E6] text-[#000000]', // Ice Hockey
  33: 'bg-[#FBDFB1] text-[#693D11]', // Football
  36: 'bg-[#800080] text-[#FFFFFF]', // MMA
  40: 'bg-[#006400] text-[#FFFFFF]', // Cricket
  44: 'bg-[#00008B] text-[#FFFFFF]', // American Football
  45: 'bg-[#FFFF00] text-[#000000]', // Tennis
  56: 'bg-[#DC143C] text-[#FFFFFF]', // Politics
  58: 'bg-[#8B4513] text-[#FFFFFF]', // Rugby League
  59: 'bg-[#8B0000] text-[#FFFFFF]' // Rugby Union
};
const SPORT_NAME_SIZE = {
  sm: 'text-[10px]',
  md: 'text-[12px]',
  lg: 'text-[14px]'
};
export const SportName = ({ name, sportId: id, size = 'sm' }: any) => {
  // @ts-ignore
  const _class = SPORT_DATA[id] || SPORT_DATA[33];
  // @ts-ignore
  const _size = SPORT_NAME_SIZE[size] || SPORT_NAME_SIZE.sm;
  return (
    <div
      className={`w-fit px-2 text-[10px] uppercase font-[600] rounded-full ${_class} ${_size}`}
    >
      {name}
    </div>
  );
};
