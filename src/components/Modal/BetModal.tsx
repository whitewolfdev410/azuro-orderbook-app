import React, { useEffect } from 'react';
// @ts-ignore
import { ExploreContext } from '@/providers/ExploreProvider';
import compareOutcome from '@/utils/compareOutcome';
import { useBaseBetslip } from '@azuro-org/sdk';
import { useContext } from 'react';
import Modal from 'react-modal';
import CloseCircle from '../Icons/CloseCircle';

const customStyles = {
  content: {
    top: 'auto',
    left: '50%',
    right: '50%',
    bottom: '0',
    marginRight: '-45%',
    marginLeft: '-45%',
    width: '90%',
    marginBottom: '20px',
    backgroundColor: '#252A31CC',
    borderRadius: '24px',
    border: '1px solid #FFFFFF1A',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '0',
    maxHeight: '100vh',
    overflowY: 'auto'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '10'
  }
};

type BetModalProps = {
  modalBody?: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

const BetModal = ({ modalBody = null, isOpen, onClose }: BetModalProps) => {
  const { outcomeSelected } = useContext(ExploreContext);
  const { items } = useBaseBetslip();
  const handleClose = () => {
    onClose();
  };
  const _outcomeSelected = items.find((item) =>
    compareOutcome(item, outcomeSelected)
  );
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="Bet Modal"
      onRequestClose={handleClose}
    >
      <div className="flex flex-col">
        <div className="flex justify-start p-[15px] items-center gap-2">
          <div className="cursor-pointer">
            <CloseCircle onClick={handleClose} />
          </div>
          <span className="text-white  text-[21px] font-[700]">
            {_outcomeSelected?.marketName}
          </span>
        </div>
        <div className="border-b border-white border-opacity-10"></div>
        <div className="overflow-y-auto max-h-[calc(95vh-100px)]">
          {modalBody}
        </div>
      </div>
    </Modal>
  );
};

export default BetModal;
