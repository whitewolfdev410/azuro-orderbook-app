'use client'

import { useTheme } from '@/app/ThemeContext'
import Betslip from '@/components/BetslipButton/Betslip'
import MyBets from '@/components/BetslipButton/MyBets'
import { ExploreContext } from '@/contexts'
import { Icons, IconsProps } from '@/icons'
import { useBaseBetslip } from '@azuro-org/sdk'
import clsx from 'clsx'
import React, { use } from 'react'

const PADDING = 40

type BetTabOption = {
  key: string
  label: string
  icon: IconsProps['name']
}

const betTabOptions = (numItems: number): BetTabOption[] => [
  { key: 'betslip', label: `Betslip (${numItems})`, icon: 'judge' },
  { key: 'mybets', label: 'My Bets', icon: 'receipt' },
]

type HeaderProps = {
  type: string
  setType: (type: string) => void
  setIsOpen: (isOpen: boolean) => void
  numItems: number
}

const Header = ({
  type,
  setType,
  setIsOpen,
  numItems,
}: Readonly<HeaderProps>) => {
  const options = betTabOptions(numItems)
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex items-center gap-2 h-[56px] rounded-full bg-[#FFFFFF0D] p-2 w-full">
        {options.map((item) => (
          <button
            key={item.key}
            className={clsx(
              'flex items-center justify-center px-4 rounded-full h-full w-full hover:bg-[#FFFFFF] hover:text-black cursor-pointer',
              {
                'text-[#868C98]': type !== item.key,
                'bg-[#FFFFFF] text-black': type === item.key,
              }
            )}
            onClick={() => {
              setType(item.key)
            }}
          >
            <Icons name={item.icon} />
            {item.label}
          </button>
        ))}
      </div>
      <span className="lg:hidden">
        <Icons
          name="closeCircle"
          className="cursor-pointer"
          onClick={() => {
            setIsOpen(false)
          }}
        />
      </span>
    </div>
  )
}

export default function BetslipButtonContent({
  isOpen,
  setIsOpen,
}: Readonly<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void }>) {
  const { items } = useBaseBetslip()
  const [type, setType] = React.useState('betslip')

  // const betslipButtonRef = React.useRef<HTMLDivElement>(null)
  //calc height of the betslip content from "Betslip" to bottom of the screen
  // const [height, setHeight] = React.useState(0)
  // useEffect(() => {
  //     setHeight(
  //         window.innerHeight -
  //         Number(betslipButtonRef.current?.getBoundingClientRect().top) -
  //         Number(betslipButtonRef.current?.getBoundingClientRect().height) -
  //         PADDING
  //     )
  // }, [])

  const onClose = () => {
    setIsOpen(false)
  }
  const { theme } = useTheme()
  let { isBetInfoOpen } = use(ExploreContext)

  return (
    <div
      className={clsx(
        'max-lg:absolute z-[3] right-0 max-lg:max-w-[calc(100vw-2rem)] lg:w-[100%] w-[100vw] rounded-lg p-4 overflow-hidden flex flex-col',
        {
          hidden: !isOpen,
        },
        'max-lg:mt-2 max-lg:80vh',
        'shadow-slate-400',
        isBetInfoOpen ? 'max-h-[70vh]' : 'max-h-[80vh]',
        theme === 'dark'
          ? 'bg-[#252A31]'
          : 'bg-gradient-to-b from-blue-500/70 to-transparent border border-white' // Change based on the theme
      )}
      // style={{
      //     height: `80vh`,
      //     top:
      //         Number(betslipButtonRef.current?.getBoundingClientRect().height) +
      //         PADDING / 2 +
      //         'px',
      //     boxShadow: '0 0px 300px 24px rgb(0 0 0 / 80%)',
      // }}
    >
      <Header
        type={type}
        setType={setType}
        setIsOpen={setIsOpen}
        numItems={items.length}
      />
      <div className="mt-4 flex-1 overflow-hidden flex flex-col">
        {type === betTabOptions(items.length)[0].key ? <Betslip /> : <MyBets />}
      </div>
    </div>
  )
}
