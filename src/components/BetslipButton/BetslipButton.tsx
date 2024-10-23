'use client'
import { Button } from '@/components'
import BetslipButtonContent from '@/components/BetslipButton/BetslipButtonContent'
import { useBreakpoints } from '@/hooks'
import Icons, { IconsProps } from '@/icons'
import React, { useEffect } from 'react'
import CountBetslipCircle from './CountBetslipCircle'
import clsx from 'clsx'
import { useTheme } from '@/app/ThemeContext'

const PADDING = 40

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
  const {theme} = useTheme()
  return (
    <div className="relative h-[40px]">
      <CountBetslipCircle />
      <div
        className="text-[12px] cursor-pointer h-full relative"
        ref={betslipButtonRef}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <Button
          variant="outlineGradient"
          className={clsx("h-full rounded-lg p-1 flex items-center text-center font-[500] text-[16px]",
            // theme === 'dark' ? "bg-[#FFFFFF1A]": 'bg-gray-400',
          )}
        >
          <Icons name="judge" className="mr-0" />
          {!breakpoints.isXs ? 'Betslip' : ''}
        </Button>
      </div>
      <BetslipButtonContent isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
