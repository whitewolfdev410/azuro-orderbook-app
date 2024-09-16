import React from 'react';
import ReceiptItemIcon from '../Icons/ReceiptItemIcon';

const MyBetFilterNotFound = () => {
  return (
    <div className="mt-40 flex items-center justify-center flex-col gap-1">
      <ReceiptItemIcon />
      <div className="text-center mt-2 font-bold">No bets found</div>
    </div>
  );
};

export default MyBetFilterNotFound;
