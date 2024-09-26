import { useBaseBetslip } from '@azuro-org/sdk'
import clsx from 'clsx'
import classes from './styles/CountBetslipCircle.module.css'

const CountBetslipCircle = () => {
  const { items } = useBaseBetslip()

  return <div className={clsx(classes.gradient)}>{items?.length}</div>
}

export default CountBetslipCircle
