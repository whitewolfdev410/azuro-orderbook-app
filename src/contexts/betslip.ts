'use client';
import { createContext } from 'react';

export type BetslipContextValue = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggleOpen: () => void;
};

export const BetslipContext = createContext<BetslipContextValue | null>(null);
