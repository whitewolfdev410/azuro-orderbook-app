'use client';
import { useAddEvent } from '@/hooks';
import Icons from '@/icons';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

export type NotiObject = {
  title: string;
  description: string;
  status?: 'success' | 'error';
  nameIcon?: string;
};

const Notification = () => {
  const [visible, setVisible] = useState(false);
  const [notiObject, setNotiObject] = useState<NotiObject | null>(null);
  const { status } = notiObject ?? {};

  useAddEvent('notification', (event: CustomEvent) => {
    setNotiObject(event.detail);
    setVisible(true);
    setTimeout(() => setVisible(false), 5000);
  });

  const icon = useMemo(() => {
    if (status === 'success')
      return (
        <Icons
          name={notiObject?.nameIcon ?? 'moneyTick'}
          width={18}
          height={18}
        />
      );
    if (status === 'error') return <Icons name="warning" />;
  }, [notiObject, status]);

  return (
    <div
      className={clsx(
        'fixed top-20 right-5 bg-[#373B3F] text-white rounded-lg shadow-2xl w-[318px] transition-all duration-500 opacity-0',
        {
          'opacity-100 z-50': visible,
          'z-[-1]': !visible,
        }
      )}
    >
      <div
        className={clsx('flex items-center p-3 gap-1 font-medium text-xs', {
          'text-yellowDanger-noti': status === 'error',
          'text-[#54D09E]': status === 'success',
        })}
      >
        {icon}
        <span>{notiObject?.title}</span>
      </div>
      <hr className="border-t border-white border-opacity-10" />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium">{notiObject?.description}</div>
        </div>
      </div>
      <button
        className="absolute top-0 right-[10px] text-gray-400 hover:text-white text-[22px]"
        onClick={() => setVisible(false)}
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;

export const showNotification = (notiObject: NotiObject) => {
  window.dispatchEvent(new CustomEvent('notification', { detail: notiObject }));
};

export const dispatchEvent = (event, detail) => {
  window.dispatchEvent(new CustomEvent(event, { detail }));
};
