import { ReactElement, ReactNode, useState } from 'react';

type DialogProps = {
  children: (props: {
    open: boolean;
    onClose: () => void;
    params: Record<string, any>;
  }) => ReactElement;
  params?: Record<string, any>;
};

export const useDialog = ({
  children,
  params = {}
}: DialogProps): { onOpen: () => void; Component: ReactNode } => {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  return { onOpen, Component: children({ open, onClose, params }) };
};
