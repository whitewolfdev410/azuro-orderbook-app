'use client'
import { ExploreContext } from '@/contexts'
import { useAddEvent } from '@/hooks'
import { CheckCircle, SportIcon } from '@/icons'
import clsx from 'clsx'
import { use, useState } from 'react'

type BetNotiObject = {
  sportId: number
  title1: string
  title2: string
  title3: string
  betNumber: string
}

const BetSuccessNoti = () => {
  const [visible, setVisible] = useState(false)
  const [notiObject, setNotiObject] = useState<BetNotiObject | null>(null)
  const { betTokenSymbol } = use(ExploreContext)

  useAddEvent('betSuccess', (event: CustomEvent) => {
    setNotiObject(event.detail)
    setVisible(true)
    setTimeout(() => setVisible(false), 5000)
  })

  return (
    <div
      className={clsx(
        'fixed top-20 right-5 bg-[#373B3F] text-white rounded-lg shadow-2xl w-[318px] z-50 transition-all duration-500',
        {
          block: visible,
          hidden: !visible,
        }
      )}
    >
      <div className="flex items-center p-3">
        <CheckCircle style={{ color: '#54D09E' }} className="mr-1" />
        <span className="text-[#54D09E] font-medium text-xs">Bet accepted</span>
      </div>
      <hr className="border-t border-white border-opacity-10" />
      <div className="p-3">
        <div className="text-xs text-[#FFFFFF99]">{notiObject?.title1}</div>
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold">{notiObject?.title2}</div>
          <div className="ml-2 text-sm font-semibold text-[#54D09E]">
            {notiObject?.betNumber} {betTokenSymbol}
          </div>
        </div>
        <div className="mt-6 flex items-center gap-1">
          <SportIcon sportId={notiObject?.sportId} />
          <div className="text-xs font-semibold text-[#FFFFFF99]">
            {notiObject?.title3}
          </div>
        </div>
      </div>
      <button
        className="absolute top-0 right-[10px] text-gray-400 hover:text-white text-[22px]"
        onClick={() => setVisible(false)}
      >
        &times;
      </button>
    </div>
  )
}

export default BetSuccessNoti

export const openBetSuccessNoti = (notiObject: BetNotiObject) => {
  window.dispatchEvent(new CustomEvent('betSuccess', { detail: notiObject }))
}
