'use client';
import React, { useState } from 'react';
import CheckCircle from '../Icons/CheckCircle';
import useAddEvent from '@/hooks/useAddEvent';
import clsx from 'clsx';
import Icons from '../Icons';

type NotiObject = {
  title: string;
  description: string;
  status?: 'success' | 'error';
  nameIcon?: string;
};

const Notification = () => {
  const [visible, setVisible] = useState(false);
  const [notiObject, setNotiObject] = useState<NotiObject | null>(null);

  const status = notiObject?.status || 'success';

  useAddEvent('notification', (event: CustomEvent) => {
    setNotiObject(event.detail);
    setVisible(true);
    setTimeout(() => setVisible(false), 5000); // Close after 5 seconds
  });

  return (
    <div
      className={clsx(
        `fixed top-20 right-5 bg-[#373B3F] text-white rounded-lg shadow-2xl w-[318px] transition-all duration-500 opacity-0`,
        {
          'opacity-100': visible,
          'z-50': visible,
          'z-[-1]': !visible
        }
      )}
    >
      <div className="flex items-center p-3">
        {status === 'success' ? (
          <>
            <Icons
              name={notiObject?.nameIcon || 'moneyTick'}
              style={{ color: '#54D09E' }}
              className="mr-1"
              width={18}
              height={18}
            />
            <span className="text-[#54D09E] font-medium text-xs">
              {notiObject?.title}
            </span>
          </>
        ) : status === 'error' ? (
          <>
            <Icons name={'warning'} className="text-yellowDanger-noti mr-1" />
            <span className="text-yellowDanger-noti font-medium text-xs">
              {notiObject?.title}
            </span>
          </>
        ) : null}
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

export const dispatchEvent = (event, detail: any) => {
  window.dispatchEvent(new CustomEvent(event, { detail }));
};
