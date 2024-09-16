'use client';
import React, { useEffect } from 'react';
import cx from 'clsx';
import MyBets from './MyBets';
import Betslip from './Betslip';
import Icons from '@/components/Icons';
import { Button } from '@/components';
import CountBetslipCircle from './CountBetslipCircle';
import { useBreakpoints } from '@/hooks/useBreakpoints';
const PADDING = 40;

const TYPES = [
  { label: 'Betslip', icon: 'judge' },
  { label: 'My Bets', icon: 'receipt' }
];
type Props = {};

export default function Index(props: Props) {
  const betslipButtonRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [type, setType] = React.useState(TYPES[0].label);
  const breakpoints = useBreakpoints();

  //calc height of the betslip content from "Betslip" to bottom of the screen
  const [height, setHeight] = React.useState(0);
  useEffect(() => {
    setHeight(
      window.innerHeight -
        Number(betslipButtonRef.current?.getBoundingClientRect().top) -
        Number(betslipButtonRef.current?.getBoundingClientRect().height) -
        PADDING
    );
  }, []);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative h-[40px]">
        <CountBetslipCircle />
        <div
          className="text-[12px] cursor-pointer h-full"
          ref={betslipButtonRef}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Button
            variant="outlineGradient"
            className="bg-[#FFFFFF1A] h-full rounded-xl px-1 py-1 flex items-center text-center font-[500] text-[16px]"
          >
            <Icons name="judge" className="mr-2" />
            {!breakpoints.isXs ? 'Betslip' : ''}
          </Button>
        </div>
        <div
          className={cx(
            'absolute z-[3] right-0 max-w-[calc(100vw-2rem)] max-h-[84vh] w-[450px] bg-[#252A31] rounded-2xl p-4 overflow-hidden flex flex-col',
            {
              hidden: !isOpen
            }
          )}
          style={{
            height: `${height}px`,
            top:
              Number(betslipButtonRef.current?.getBoundingClientRect().height) +
              PADDING / 2 +
              'px',
            boxShadow: '0 0px 300px 24px rgb(0 0 0 / 80%)'
          }}
        >
          <Header type={type} setType={setType} setIsOpen={setIsOpen} />
          <div className="mt-4 flex-1 overflow-hidden flex flex-col">
            {type === TYPES[0].label ? (
              <Betslip onClose={onClose} />
            ) : (
              <MyBets />
            )}
          </div>
        </div>
      </div>
      {/* {isOpen && (
        <div
          onClick={onClose}
          className="w-[100vw] h-[100vh] absolute top-0 left-0 z-[2]"
        />
      )} */}
    </>
  );
}

const Header = ({
  type,
  setType,
  setIsOpen
}: {
  type: string;
  setType: (type: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex items-center gap-2 h-[56px] rounded-full bg-[#FFFFFF0D] p-2 w-fit">
        {TYPES.map((item: { label: string; icon: string }) => (
          <div
            key={item.label}
            className={cx(
              'flex items-center justify-center px-4 rounded-full h-full w-fit hover:bg-[#FFFFFF] hover:text-black cursor-pointer',
              {
                'text-[#868C98]': type !== item.label,
                'bg-[#FFFFFF] text-black': type === item.label
              }
            )}
            onClick={() => {
              setType(item.label);
            }}
          >
            <Icons name={item.icon} />
            {item.label}
          </div>
        ))}
      </div>
      <Icons
        name="closeCircle"
        className="cursor-pointer"
        onClick={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};
