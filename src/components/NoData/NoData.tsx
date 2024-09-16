import React, { use } from 'react';
import Icons, { EIcons } from '@/components/Icons';
import { ExploreContext } from '@/providers/ExploreProvider';
const NoData = () => {
  const { selectedSport, sports } = use(ExploreContext);
  const sportName = sports.find(
    (sport) => sport.sportId === selectedSport
  )?.name;
  return (
    <div className="flex flex-col items-center justify-center w-full text-center">
      <Icons name={EIcons.NO_DATA} />
      <div className="text-white text-[16px] font-semibold my-[20px]">
        No events
      </div>
      <div className="text-[#FFFFFF99] text-[14px] font-normal">
        Bets are currently unavailable for {sportName}.
        <br /> Please try a different sport!
      </div>
    </div>
  );
};

export default NoData;
