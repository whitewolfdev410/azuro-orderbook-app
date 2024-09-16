import React from 'react';
import Search from './Search';
import Logo from './Logo';
import Goal from './Goal';
import Dropdown from './Dropdown';
import ExplorePrefix from './ExporePrefix';
import CloseCircle from './CloseCircle';
import BackCircle from './BackCircle';
import Judge from './Judge';
import Receipt from './Receipt';
import CloseCircleOutline from './CloseCircleOutline';
import ConnectWalletIcon from './ConnectWalletIcon';
import Delete from './Delete';
import { Sport } from './Sport';
import { Esport } from './Esports';
import ChevronDown from './ChevronDown';
import JudgeOutline from './JudgeOutline';
import CloseIcon from './CloseIcon';
import NoData from './NoDataIcon';
import Warning from './Warning';
import MoneyTickIcon from './MoneyTickIcon';

export enum EIcons {
  SEARCH = 'search',
  LOGO = 'logo',
  GOAL = 'goal',
  DROPDOWN = 'dropdown',
  ExplorePrefix = 'explorePrefix',
  CLOSE_CIRCLE = 'closeCircle',
  BACK_CIRCLE = 'backCircle',
  JUDGE = 'judge',
  JUDGE_OUTLINE = 'judgeOutline',
  RECEIPT = 'receipt',
  CIRCLE_OUTLINE = 'closeCircleOutline',
  DELETE = 'delete',
  CONNECT_WALLET = 'connectWallet',
  WARNING = 'warning',
  MONEY_TICK = 'moneyTick',
  Esport = 'esport',
  Sport = 'sport',
  CHEVRON_DOWN = 'chevronDown',
  CLOSE_ICON = 'closeIcon',
  NO_DATA = 'noData'
}
const ICONS = {
  [EIcons.SEARCH]: Search,
  [EIcons.LOGO]: Logo,
  [EIcons.GOAL]: Goal,
  [EIcons.DROPDOWN]: Dropdown,
  [EIcons.ExplorePrefix]: ExplorePrefix,
  [EIcons.CLOSE_CIRCLE]: CloseCircle,
  [EIcons.BACK_CIRCLE]: BackCircle,
  [EIcons.JUDGE]: Judge,
  [EIcons.JUDGE_OUTLINE]: JudgeOutline,
  [EIcons.RECEIPT]: Receipt,
  [EIcons.CIRCLE_OUTLINE]: CloseCircleOutline,
  [EIcons.DELETE]: Delete,
  [EIcons.CONNECT_WALLET]: ConnectWalletIcon,
  [EIcons.WARNING]: Warning,
  [EIcons.MONEY_TICK]: MoneyTickIcon,
  [EIcons.Esport]: Esport,
  [EIcons.Sport]: Sport,
  [EIcons.CHEVRON_DOWN]: ChevronDown,
  [EIcons.CLOSE_ICON]: CloseIcon,
  [EIcons.NO_DATA]: NoData
};
const Icons = ({ name, ...props }: any) => {
  //@ts-ignore
  if (!ICONS[name]) return null;
  //@ts-ignore
  const Icon = ICONS[name];
  return <Icon {...props} />;
};

export default Icons;
