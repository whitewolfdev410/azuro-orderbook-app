'use client';
import { SelectAppChain } from '@/components';
import { useDialog } from '@/hooks';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { ExploreContext } from '@/providers/ExploreProvider';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { reconnect } from '@wagmi/core';
import Link from 'next/link';
import { use, useEffect, useRef } from 'react';
import { useConfig } from 'wagmi';
import BetslipButton from './BetslipButton';
import { IconButton } from './Buttons';
import CustomConnectButton from './CustomConnectButton'; // Import the new component
import { Dialog as ExploreDialog } from './Dialogs';
import ExploreDialogContent from './ExploreDialogContent';

import Icons from './Icons';
import Input from './Input';
export function Header() {
  const config = useConfig();
  const breakpoints = useBreakpoints();
  const { searchGame, searching } = use(ExploreContext);
  const searchRef = useRef<HTMLInputElement>(null);

  const { onOpen, Component: dialogContent } = useDialog({
    children: ({ open, onClose, params }) => (
      <ExploreDialog title="Topics" open={open} onClose={onClose} {...params}>
        <ExploreDialogContent onClose={onClose} />
      </ExploreDialog>
    )
  });

  useEffect(() => {
    (async () => {
      try {
        await reconnect(config);
      } catch {}
    })();
  }, []);

  const SearchInput = (
    <Input
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        searchGame(e.target.value)
      }
      ref={searchRef}
      startIcon={<Icons name="search" />}
      placeholder="Search..."
      containerClass="flex-1"
    />
  );
  return (
    <header className="flex flex-col items-center py-3.5 gap-2">
      <div className="flex gap-3 items-center w-full">
        <Link href="/" className="text-xl font-semibold">
          <Icons name="logo" className="mr-2" />
        </Link>
        {!breakpoints.isXs && (
          <IconButton
            text="Explore"
            trailingIcon="dropdown"
            prefixIcon="explorePrefix"
            clicked={() => onOpen()}
            className={`${!breakpoints.isLg ? 'hidden' : ''}`}
          />
        )}
        {!breakpoints.isXs && <div className="flex-1 mx-2">{SearchInput}</div>}
        <div className="ml-auto flex items-center gap-2">
          <SelectAppChain />
          <CustomConnectButton />
          <BetslipButton />
        </div>
      </div>
      {breakpoints.isXs && <div className="w-full mt-2">{SearchInput}</div>}
      {dialogContent}
    </header>
  );
}
