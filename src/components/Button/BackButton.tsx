'use client';
import React from 'react';
import Icon from '../Icons/Icon';
import ArrowLeftIcon from '../Icons/ArrowLeft';
import { useRouter } from 'next/navigation';

type BackButtonProps = {
  onClick?: () => void;
};

const BackButton = (props: BackButtonProps) => {
  const router = useRouter();
  const { onClick: _onClick } = props;
  const onClick = () => {
    if (_onClick) _onClick();
    else {
      router.back();
    }
  };
  return (
    <button
      className="flex items-center gap-2 mt-4 sm:ml-[10%]"
      onClick={onClick}
    >
      <Icon className="bg-white p-[6px]">
        <ArrowLeftIcon />
      </Icon>
      <div>Back</div>
    </button>
  );
};

export default BackButton;
