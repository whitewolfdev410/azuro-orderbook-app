import NotFoundImg from '@/assets/img/not-found.svg'
import Link from 'next/link'
import classes from './styles/index.module.css'

const GameInfoNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-20">
      <img
        src={NotFoundImg.src}
        alt="not found"
        className="w-[184px] h-[187px] max-h-full mb-10"
      />
      <div className="text-base font-semibold">
        Oops, looks like you get lose..
      </div>
      <div className="text-appGray-600 max-w-[400px] text-center">
        The page you are looking for doesn&apos;t exist anymore or has been
        moved or archived
      </div>
      <Link href="/">
        <button className={classes.btn}>Go to home</button>
      </Link>
    </div>
  )
}

export default GameInfoNotFound
