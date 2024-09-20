import { useEffect } from 'react';

const useAddEvent = (
  eventName = 'default',
  eventHandler?: (event: CustomEvent) => void
) => {
  useEffect(() => {
    window.addEventListener(eventName, eventHandler as EventListener);
    return () => {
      window.removeEventListener(eventName, eventHandler as EventListener);
    };
  }, [eventName, eventHandler]);

  return null;
};

export default useAddEvent;
