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
    top: 'auto', // Changed from '50%' to 'auto'
    left: '50%',
    right: '50%', // Added to center horizontally
    bottom: '0', // Set to '0' for bottom alignment
    marginRight: '-45%', // Adjusted for centering
    marginLeft: '-45%', // Adjusted for centering
    width: '90%', // Set width to 90%
    marginBottom: '20px',
    backgroundColor: '#252A31CC',
    borderRadius: '24px',
    border: '1px solid #FFFFFF1A',
    backdropFilter: 'blur(20px)', // Increased blur effect
    WebkitBackdropFilter: 'blur(10px)',
    padding: '0',
    maxHeight: '100vh', // Set maximum height
    overflowY: 'auto' // Enable vertical scrolling
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker backdrop
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
      isOpen={isOpen} // Modal is now managed by state
      style={customStyles}
      contentLabel="Bet Modal"
      onRequestClose={handleClose} // Close modal on backdrop click
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
