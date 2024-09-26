import { ExploreContext } from '@/contexts'
import { CloseCircle } from '@/icons'
import { compareOutcome } from '@/utils'
import { useBaseBetslip } from '@azuro-org/sdk'
import React, { useContext, useEffect, useMemo } from 'react'
import Modal from 'react-modal'

const customStyles: Record<string, React.CSSProperties> = {
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
    overflowY: 'auto',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '10',
  },
}

export type BetModalProps = {
  modalBody?: React.ReactNode
  onClose: () => void
  isOpen: boolean
}

const BetModal = ({
  modalBody = null,
  isOpen,
  onClose,
}: Readonly<BetModalProps>) => {
  const { outcomeSelected } = useContext(ExploreContext)
  const { items } = useBaseBetslip()

  const _outcomeSelected = useMemo(() => {
    if (!outcomeSelected) return null
    return items.find((item) => compareOutcome(item, outcomeSelected))
  }, [outcomeSelected, items])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="Bet Modal"
      onRequestClose={onClose}
    >
      <div className="flex flex-col">
        <div className="flex justify-start p-[15px] items-center gap-2">
          <div className="cursor-pointer">
            <CloseCircle onClick={onClose} />
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
  )
}

export default BetModal
