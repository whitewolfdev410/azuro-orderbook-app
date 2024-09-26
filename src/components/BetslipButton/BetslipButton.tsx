'use client'
import { Button } from '@/components'
import { useBreakpoints } from '@/hooks'
import Icons, { IconsProps } from '@/icons'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import Betslip from './Betslip'
import CountBetslipCircle from './CountBetslipCircle'
import MyBets from './MyBets'

const PADDING = 40

type BetTabOption = {
  label: string
  icon: IconsProps['name']
}

const betTabOptions: BetTabOption[] = [
  { label: 'Betslip', icon: 'judge' },
  { label: 'My Bets', icon: 'receipt' },
]

export default function BetslipButton() {
  const betslipButtonRef = React.useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [type, setType] = React.useState(betTabOptions[0].label)
  const breakpoints = useBreakpoints()

  //calc height of the betslip content from "Betslip" to bottom of the screen
  const [height, setHeight] = React.useState(0)
  useEffect(() => {
    setHeight(
      window.innerHeight -
        Number(betslipButtonRef.current?.getBoundingClientRect().top) -
        Number(betslipButtonRef.current?.getBoundingClientRect().height) -
        PADDING
    )
  }, [])
  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative h-[40px]">
      <CountBetslipCircle />
      <div
        className="text-[12px] cursor-pointer h-full"
        ref={betslipButtonRef}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <Button
          variant="outlineGradient"
          className="bg-[#FFFFFF1A] h-full rounded-xl px-1 py-1 flex items-center text-center font-[500] text-[16px]"
        >
          <Icons name="judge" className="mr-2" />
          {!breakpoints.isXs ? 'Betslip' : ''}
        </Button>
      </div>
      <div
        className={clsx(
          'absolute z-[3] right-0 max-w-[calc(100vw-2rem)] max-h-[84vh] w-[450px] bg-[#252A31] rounded-2xl p-4 overflow-hidden flex flex-col',
          {
            hidden: !isOpen,
          }
        )}
        style={{
          height: `${height}px`,
          top:
            Number(betslipButtonRef.current?.getBoundingClientRect().height) +
            PADDING / 2 +
            'px',
          boxShadow: '0 0px 300px 24px rgb(0 0 0 / 80%)',
        }}
      >
        <Header type={type} setType={setType} setIsOpen={setIsOpen} />
        <div className="mt-4 flex-1 overflow-hidden flex flex-col">
          {type === betTabOptions[0].label ? (
            <Betslip onClose={onClose} />
          ) : (
            <MyBets />
          )}
        </div>
      </div>
    </div>
  )
}

export type HeaderProps = {
  type: string
  setType: (type: string) => void
  setIsOpen: (isOpen: boolean) => void
}

const Header = ({ type, setType, setIsOpen }: Readonly<HeaderProps>) => {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex items-center gap-2 h-[56px] rounded-full bg-[#FFFFFF0D] p-2 w-fit">
        {betTabOptions.map((item: { label: string; icon: string }) => (
          <button
            key={item.label}
            className={clsx(
              'flex items-center justify-center px-4 rounded-full h-full w-fit hover:bg-[#FFFFFF] hover:text-black cursor-pointer',
              {
                'text-[#868C98]': type !== item.label,
                'bg-[#FFFFFF] text-black': type === item.label,
              }
            )}
            onClick={() => {
              setType(item.label)
            }}
          >
            <Icons name={item.icon} />
            {item.label}
          </button>
        ))}
      </div>
      <Icons
        name="closeCircle"
        className="cursor-pointer"
        onClick={() => {
          setIsOpen(false)
        }}
      />
    </div>
  )
}
