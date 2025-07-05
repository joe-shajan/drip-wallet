'use client';
import React from 'react';
import { Button } from './ui/button';
import { EthereumIcon, SolanaIcon } from './icons';
import { useWallet } from '@/context/WalletContext';

const networks = [
  {
    name: 'Solana',
    key: 'solana',
    icon: SolanaIcon,
  },
  {
    name: 'Ethereum',
    key: 'ethereum',
    icon: EthereumIcon,
  },
];

const NetworkSetup: React.FC<{ onNext?: () => void }> = ({ onNext }) => {
  const { state, dispatch } = useWallet();

  const toggleNetwork = (key: string) => {
    dispatch({
      type: 'SET_NETWORKS',
      payload: state.selectedNetworks.includes(key)
        ? state.selectedNetworks.filter(k => k !== key)
        : [...state.selectedNetworks, key],
    });
  };

  return (
    <div className='flex flex-col items-center justify-center font-sans text-white'>
      <h2 className='mb-1 text-[22px] font-semibold'>Set up networks</h2>
      <p className='mb-6 max-w-xs text-center text-[15px] text-[#B1B5C3]'>
        You can always add and remove later.
      </p>
      <div className='mb-8 flex w-full max-w-xs flex-col gap-4'>
        {networks.map(network => {
          const selected = state.selectedNetworks.includes(network.key);
          return (
            <div
              key={network.key}
              className='relative cursor-pointer overflow-hidden rounded-xl'
              onClick={() => toggleNetwork(network.key)}
            >
              <div className='bg-background dark:bg-input/30 dark:border-input dark:hover:bg-input/50 relative z-10 flex items-center gap-3 rounded-xl px-4 py-3'>
                {/* Selection indicator */}
                <span
                  className={`mr-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#35373B] ${
                    selected ? 'bg-white' : 'bg-transparent'
                  }`}
                >
                  {selected && (
                    <span className='block h-2 w-2 rounded-full bg-white' />
                  )}
                </span>
                <network.icon />
                <span className='text-base font-medium'>{network.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        disabled={state.selectedNetworks.length === 0}
        variant='outline'
        className='mt-8 w-full'
        onClick={onNext}
      >
        Set up wallets
      </Button>
    </div>
  );
};

export default NetworkSetup;
