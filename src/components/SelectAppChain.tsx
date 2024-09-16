'use client';
import { useBaseBetslip, useChain } from '@azuro-org/sdk';
import { type ChainId } from '@azuro-org/toolkit';
import { polygonAmoy, gnosis, polygon, chiliz, spicy } from 'viem/chains';
import { ExploreContext } from '@/providers/ExploreProvider';
import { use, useRef } from 'react';
import Select, { components, DropdownIndicatorProps } from 'react-select'; // Ensure this import is at the top
import Image from 'next/image';
import ChainIcons from './Icons/ChainIcons/ChainIcons';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import Icons, { EIcons } from './Icons';

const CHAINS = [polygonAmoy, gnosis, polygon, chiliz, spicy] as const;

export function SelectAppChain() {
  const { appChain, setAppChainId } = useChain();
  const { clear } = useBaseBetslip();

  const breakpoints = useBreakpoints();
  const { clearFilterGames, clearFilterSports } = use(ExploreContext);

  const handleChange = (selectedOption: { value: ChainId }) => {
    setAppChainId(selectedOption.value);
    clearFilterGames();
    clearFilterSports();
    clear();

    // To refetch the game data
    window.location.replace('/');
  };

  const options = CHAINS.map((chain) => ({
    value: chain.id,
    label: chain.name,
    icon: ChainIcons[chain.id]
  }));

  const CustomOption = ({
    data,
    ...props
  }: {
    data: { icon: any; label: string };
  }) => (
    // @ts-ignore
    <components.Option {...props}>
      <div className="flex items-center whitespace-nowrap gap-2">
        <Image src={data.icon} alt="chain icon" width={24} height={24} />
        {data.label}
      </div>
    </components.Option>
  );

  const DropdownIndicator = (props: DropdownIndicatorProps) => (
    <components.DropdownIndicator {...props}>
      <Icons name={EIcons.CHEVRON_DOWN} className="text-white" />
    </components.DropdownIndicator>
  );

  return (
    <div className="rounded-xl">
      <Select
        components={{
          IndicatorSeparator: () => null,
          // @ts-ignore
          Option: CustomOption,
          // @ts-ignore
          DropdownIndicator: DropdownIndicator
        }}
        styles={{
          singleValue: (base) => ({
            ...base,
            color: 'white',
            fontWeight: 400,
            fontSize: '12px'
          }),
          control: (base, state) => ({
            ...base,
            background: '#FFFFFF0D',
            width: 'fit-content',
            color: 'white',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: state.isFocused ? 'none' : 'none',
            border: 0,
            borderRadius: '0.5rem'
          }),
          option: (base, state) => ({
            ...base,
            background: state.isSelected ? '#FFFFFF0D' : '#373B3F',
            color: 'white',
            cursor: 'pointer',
            '&:hover': {
              background: '#FFFFFF0D'
            }
          }),
          menu: (base) => ({
            ...base,
            background: '#373B3F',
            minWidth: '200px'
          })
        }}
        value={{
          value: appChain.id,
          label:
            breakpoints.isXs || breakpoints.isSm ? (
              <Image
                src={ChainIcons[appChain.id]}
                alt="icon"
                width={24}
                height={24}
              />
            ) : (
              <div className="flex items-center">
                <Image
                  src={ChainIcons[appChain.id]}
                  alt="icon"
                  className="mr-2"
                  width={24}
                  height={24}
                />
                {appChain.name}
              </div>
            )
        }}
        onChange={handleChange as any}
        // @ts-ignore
        options={options}
        isSearchable={false}
      />
    </div>
  );
}
