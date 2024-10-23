'use client'
import { BackCircle, SportIcon } from '@/icons'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

export type BackButtonProps = {
  onClick?: () => void
  className?: string
  sport: {
    __typename?: "Sport" | undefined;
    sportId: string;
    slug: string;
    name: string;
  }
  leagueSlug: string
}

const BreadCrumbBackButton = ({ onClick, className, sport, leagueSlug }: Readonly<BackButtonProps>) => {
  const router = useRouter()
  const handleClick = useMemo(() => onClick ?? router.back, [onClick, router])

  return (
    <button
      className={clsx(
        "flex items-center gap-2 cursor-pointer font-bold", 
        className, 
        "hover:scale-105 transition duration-300 ease-in-out cursor-pointer" // hover style
      )}
      onClick={handleClick}
    >
      <BackCircle />
      <div className="pl-2 flex space-x-2">
        <span className="flex space-x-1">
          <SportIcon sportId={sport.sportId} />
          <span>
            {sport.name}
          </span>
        </span>
        <span>&#183;</span>
        <span>
          {leagueSlug}
        </span>
      </div>
    </button>
  )
}

export default BreadCrumbBackButton
