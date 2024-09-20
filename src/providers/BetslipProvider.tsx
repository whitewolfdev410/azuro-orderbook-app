'use client';
import { BetslipContext } from '@/contexts';
import { useBaseBetslip } from '@azuro-org/sdk';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

export type BetslipProviderProps = PropsWithChildren;

const BetslipProvider: React.FC<BetslipProviderProps> = ({ children }) => {
  const { items } = useBaseBetslip();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(Boolean(items.length));
  }, [items]);

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      toggleOpen: () => setIsOpen((prev) => !prev),
    }),
    [isOpen]
  );

  return (
    <BetslipContext.Provider value={value}>{children}</BetslipContext.Provider>
  );
};

export default BetslipProvider;
