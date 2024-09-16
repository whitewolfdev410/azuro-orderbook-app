import { useClickOutside } from '@/hooks';
import { ReactNode, useRef } from 'react';
import Icons from '../Icons';

type Props = {
  open: Boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
};

export function Dialog({ open, title, onClose, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, onClose);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85">
      <div
        className="bg-[#252A31] shadow-lg p-6 relative w-2/6 rounded-3xl"
        ref={containerRef}
      >
        <div className="flex justify-between items-center pb-[10px]">
          <h2 className="text-sm font-semibold">{title}</h2>
          <Icons
            name="closeCircle"
            className="mb-4 cursor-pointer"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
