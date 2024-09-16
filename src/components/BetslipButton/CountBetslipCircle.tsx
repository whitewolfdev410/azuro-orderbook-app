import { useBaseBetslip } from '@azuro-org/sdk';
import React from 'react';
import classes from './styles/CountBetslipCircle.module.css';
import clsx from 'clsx';

const CountBetslipCircle = () => {
  const { items } = useBaseBetslip();

  return <div className={clsx(classes.gradient)}>{items?.length}</div>;
};

export default CountBetslipCircle;
