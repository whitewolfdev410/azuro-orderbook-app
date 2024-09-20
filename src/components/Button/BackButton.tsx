'use client';
import { ArrowLeftIcon } from '@/icons';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export type BackButtonProps = {
  onClick?: () => void;
};

const BackButton = ({ onClick }: Readonly<BackButtonProps>) => {
  const router = useRouter();
  const handleClick = useMemo(() => onClick ?? router.back, [onClick, router]);

  return (
    <button
      className="flex items-center gap-2 mt-4 sm:ml-[10%]"
      onClick={handleClick}
    >
      <ArrowLeftIcon />
      <div>Back</div>
    </button>
  );
};

export default BackButton;
