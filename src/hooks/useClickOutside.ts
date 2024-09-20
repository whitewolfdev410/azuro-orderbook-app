import type { RefObject } from 'react';
import { useEffect } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement | undefined>,
  clicked: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      clicked();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useClickOutside;
