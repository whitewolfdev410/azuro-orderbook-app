'use client'
import { ButtonSkeletonArray } from '@/components/Skeleton'
import { ExploreContext } from '@/contexts'
import Icons, { SportIcon } from '@/icons'
import { SportHub } from '@azuro-org/sdk'
import clsx from 'clsx'
import { use } from 'react'

const iconsMapper = {
  [SportHub.Esports]: 'esport',
  [SportHub.Sports]: 'sport',
}

export type ExploreDialogContentProps = {
  onClose: () => void
}

const ExploreDialogContent = ({
  onClose,
}: Readonly<ExploreDialogContentProps>) => {
  const {
    categories,
    sports,
    sportsLoading,
    sportHub,
    sportSlug,
    filterGames,
    filterSports,
    setSearching,
  } = use(ExploreContext)

  const getHandleCategoryClick = (category: SportHub) => {
    setSearching('')
    filterGames('')
    filterSports(category)
    onClose()
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category, index: number) => (
          <button
            onClick={() => getHandleCategoryClick(category.id)}
            key={`${category?.name}-${index}`}
            className={clsx(
              'flex items-center gap-2 px-4 py-3 border border-[#FFFFFF1A] rounded-xl cursor-pointer',
              {
                'bg-[#FFFFFF1A] border-0': sportHub === category.id,
              }
            )}
          >
            <Icons name={iconsMapper[category.id]} />
            <p className="text-sm py-[10px] capitalize">{category?.name}</p>
          </button>
        ))}
      </div>

      <div className="py-6">
        <h2 className="text-sm font-semibold my-[10px]">Browse</h2>
        <div className="grid grid-cols-2 gap-4 max-h-72 overflow-auto">
          {sports?.map((data) => (
            <button
              key={data.name}
              className={clsx(
                'flex items-center gap-1 px-[12px] py-3 rounded-xl cursor-pointer hover:bg-[#FFFFFF1A]',
                sportSlug === data.slug ? 'bg-[#FFFFFF1A]' : 'bg-none'
              )}
              onClick={() => {
                filterGames(data.slug)
                onClose()
              }}
            >
              <SportIcon sportId={data.sportId} />
              <p className="text-sm">{data.name}</p>
            </button>
          ))}
          {sportsLoading && <ButtonSkeletonArray length={8} />}
        </div>
      </div>
    </>
  )
}

export default ExploreDialogContent
