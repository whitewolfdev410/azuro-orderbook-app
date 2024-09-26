import {
  makeSkeletonArray,
  Skeleton,
  SkeletonArray,
} from '@/components/Skeleton'
import clsx from 'clsx'

const LoadingGameInfo = () => {
  return (
    <div className="mt-10">
      <div className={clsx('flex justify-center items-center flex-col gap-2')}>
        <Skeleton className="!w-[150px] !h-[25px]" />
        <Skeleton className="!w-[450px] !h-[25px]" />
        <div className="flex gap-2 w-[450px] mt-5 max-w-full">
          <Skeleton className="flex-1 h-[70px]" />
          <div className=" my-auto">
            <Skeleton className="!w-[50px] !h-[10px]" />
          </div>
          <Skeleton className="flex-1 h-[70px]" />
        </div>
      </div>
      <div className="max-w-[800px] mx-auto mt-12 space-y-6">
        {makeSkeletonArray(3).map((key) => (
          <div key={key}>
            <Skeleton className="!w-[70px] !h-[20px]" />
            <div className="flex gap-4 mt-2 flex-col sm:flex-row sm:h-auto h-[200px]">
              <SkeletonArray
                length={2}
                className="flex-1 !h-[80px] rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoadingGameInfo
