import { FC } from 'react'
import BackCircle from './BackCircle'
import ChevronDown from './ChevronDown'
import CloseCircle from './CloseCircle'
import CloseCircleOutline from './CloseCircleOutline'
import CloseIcon from './CloseIcon'
import ConnectWalletIcon from './ConnectWalletIcon'
import Delete from './Delete'
import Dropdown from './Dropdown'
import Esport from './Esports'
import ExplorePrefix from './ExporePrefix'
import Goal from './Goal'
import Judge from './Judge'
import JudgeOutline from './JudgeOutline'
import Logo from './Logo'
import MoneyTickIcon from './MoneyTickIcon'
import NoData from './NoDataIcon'
import Receipt from './Receipt'
import Search from './Search'
import Sport from './Sport'
import Warning from './Warning'
import { IconProps, IconsProps } from './props'

export type IconName =
  | 'search'
  | 'logo'
  | 'goal'
  | 'dropdown'
  | 'explorePrefix'
  | 'closeCircle'
  | 'backCircle'
  | 'judge'
  | 'judgeOutline'
  | 'receipt'
  | 'closeCircleOutline'
  | 'delete'
  | 'connectWallet'
  | 'warning'
  | 'moneyTick'
  | 'esport'
  | 'sport'
  | 'chevronDown'
  | 'closeIcon'
  | 'noData'

const icons: Record<IconName, FC<IconProps>> = {
  search: Search,
  logo: Logo,
  goal: Goal,
  dropdown: Dropdown,
  explorePrefix: ExplorePrefix,
  closeCircle: CloseCircle,
  backCircle: BackCircle,
  judge: Judge,
  judgeOutline: JudgeOutline,
  receipt: Receipt,
  closeCircleOutline: CloseCircleOutline,
  delete: Delete,
  connectWallet: ConnectWalletIcon,
  warning: Warning,
  moneyTick: MoneyTickIcon,
  esport: Esport,
  sport: Sport,
  chevronDown: ChevronDown,
  closeIcon: CloseIcon,
  noData: NoData,
}

const Icons = ({ name, ...props }: IconsProps) => {
  const Icon = icons[name]
  if (!Icon) return <></>
  return <Icon {...props} />
}

export default Icons
