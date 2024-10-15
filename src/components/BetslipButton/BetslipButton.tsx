'use client'
import { Button } from '@/components'
import { useBreakpoints } from '@/hooks'
import Icons, { IconsProps } from '@/icons'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import Betslip from './Betslip'
import CountBetslipCircle from './CountBetslipCircle'
import MyBets from './MyBets'
import BetslipButtonContent from '@/components/BetslipButton/BetslipButtonContent'

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

  // useEffect(() => {
  //   // Effect: Function to check screen size
  //   const checkScreenSize = () => {
  //     setIsOpen(true);
  //   };
  
  //   // Initial check when the component mounts
  //   checkScreenSize();
  
  //   // Side effect: Add event listener for window resizing
  //   window.addEventListener("resize", checkScreenSize);
  
  //   // Cleanup: Remove event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("resize", checkScreenSize);
  //   };
  // }, []); // Empty dependency array ensures this runs only once when component mounts
  

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
      <BetslipButtonContent isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}


