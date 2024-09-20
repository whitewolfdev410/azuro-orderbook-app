import { ExploreContext } from '@/contexts';
import { useGameCategories } from '@/hooks';
import { ArrowLeftIcon, ArrowRight, SportIcon } from '@/icons';
import clsx from 'clsx';
import { use, useCallback, useEffect, useRef, useState } from 'react';
import classes from './styles/AllSportsTag.module.css';

export default function AllSportsTag() {
  const {
    sports,
    selectedSport,
    setSelectedSport,
    filterGames,
    selectedSportHub,
    gameLoading,
    searching,
    removeGameParams,
  } = use(ExploreContext);
  const { loading: sportLoading } = useGameCategories();
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtStart, setIsAtStart] = useState(false);
  const scrollableDiv = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerDebounceRef = useRef<any>(null);

  const handleScroll = () => {
    if (!scrollableDiv.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollableDiv.current;

    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    setIsAtStart(scrollLeft === 0);
  };

  const handleDebounceScroll = useCallback(() => {
    if (timerDebounceRef.current) {
      clearTimeout(timerDebounceRef.current);
    }

    timerDebounceRef.current = setTimeout(() => {
      handleScroll();
    }, 150);
  }, []);

  useEffect(() => {
    if (sportLoading || gameLoading) {
      return;
    }
    const _scrollableDiv = scrollableDiv.current;

    _scrollableDiv?.addEventListener('scroll', handleDebounceScroll);

    return () => {
      _scrollableDiv?.removeEventListener('scroll', handleDebounceScroll);
    };
  }, [sportLoading, gameLoading, handleDebounceScroll]);

  useEffect(() => {
    if (sports.length > 0 && !sportLoading) {
      handleScroll();
    }
  }, [sports, sportLoading]);

  const scrollRight = () => {
    if (!scrollableDiv.current) return;
    scrollableDiv.current.scrollBy({ left: 200, behavior: 'smooth' }); // Scrolls 100px to the right
  };

  const scrollLeft = () => {
    if (!scrollableDiv.current) return;
    scrollableDiv.current.scrollBy({ left: -200, behavior: 'smooth' }); // Scrolls 100px to the left
  };

  return (
    <div className="flex items-center pb-2 gap-4">
      {!sportLoading && (
        <>
          <button
            className="capitalize text-[21px] font-[700]"
            onClick={() => {
              setSelectedSport('all');
              removeGameParams('sportSlug');
            }}
          >
            {selectedSportHub}
          </button>
          <div
            className={clsx(
              'flex relative max-w-[calc(100%-86px)]',
              classes['hide-scroll-bar']
            )}
          >
            {!isAtStart && sports?.length > 0 && (
              <div className={clsx(classes['box-left'])}>
                <button className={classes.btn} onClick={scrollLeft}>
                  <ArrowLeftIcon width={'16px'} height={'16px'} />
                </button>
              </div>
            )}
            {!isAtEnd && sports?.length > 0 && (
              <div className={clsx(classes['box-right'])}>
                <button className={classes.btn} onClick={scrollRight}>
                  <ArrowRight />
                </button>
              </div>
            )}
            <div
              className={clsx(
                'flex gap-4 overflow-auto',
                classes['hide-scroll-bar']
              )}
              ref={scrollableDiv}
            >
              {sports.map((sport) => {
                const isSelected = selectedSport === sport.sportId;

                return (
                  <button
                    key={sport.sportId}
                    id={`id-${sport.sportId}`}
                    onClick={() => {
                      if (sport.slug === 'all') {
                        removeGameParams('sportSlug');
                        setSelectedSport('all');
                        return;
                      }

                      if (!searching) {
                        filterGames({
                          sportSlug: sport.slug,
                        });
                      }
                      document
                        .getElementById(`id-${sport.sportId}`)
                        ?.scrollIntoView({
                          behavior: 'smooth',
                          inline: 'center',
                          block: 'center',
                        });
                      setSelectedSport(sport.sportId);
                    }}
                    className={clsx(
                      'flex items-center gap-1 p-2 cursor-pointer rounded-lg font-bold whitespace-nowrap',
                      {
                        'bg-gradient-to-l from-[#ff65a6] via-[#b37ed3] to-[#5e64eb]':
                          isSelected,
                        'bg-[#FFFFFF0D]': !isSelected,
                      }
                    )}
                  >
                    <SportIcon sportId={sport.sportId} />
                    <span>{sport.name}</span>
                    <span className="bg-[#E6E6E6] p-1 rounded-md text-black text-[10px]">
                      {sport.total}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
