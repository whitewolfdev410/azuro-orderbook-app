import type { ReactElement, ReactNode } from 'react';
import { useCallback, useState } from 'react';

export type DialogProps = {
  children: (props: {
    open: boolean;
    onClose: () => void;
    params: Record<string, unknown>;
  }) => ReactElement;
  params?: Record<string, unknown>;
};

const useDialog = ({
  children,
  params = {},
}: DialogProps): { onOpen: () => void; Component: ReactNode } => {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  return { onOpen, Component: children({ open, onClose, params }) };
};

export default useDialog;
