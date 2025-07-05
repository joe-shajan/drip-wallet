'use client';

import { useWallet } from '@/context/WalletContext';
import {
  CopyToClipboardIcon,
  NetworkIcons,
  TickIcon,
} from '@/components/icons';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SelectNetwork({
  selectedNetwork,
  setSelectedNetwork,
}: {
  selectedNetwork: string;
  setSelectedNetwork: (network: string) => void;
}) {
  const { state } = useWallet();
  const networkKeys = Object.keys(state.wallets);

  return (
    <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {networkKeys.map(key => (
            <SelectItem
              key={key}
              value={key}
              className='flex items-center gap-2 capitalize'
            >
              {NetworkIcons[key as keyof typeof NetworkIcons]}
              <span>{key}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function WalletsPage() {
  const { state } = useWallet();
  const networkKeys = Object.keys(state.wallets);
  const [selectedNetwork, setSelectedNetwork] = useState(networkKeys[0]);
  const wallets = state.wallets[selectedNetwork] || [];
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (address: string, idx: number) => {
    navigator.clipboard.writeText(address);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-[350px] rounded-xl bg-[#181A20] p-4 text-white shadow-lg'>
        <div className='relative mb-6 flex items-center justify-center'>
          <span className='text-lg font-semibold'>Wallets</span>
        </div>
        <div className='mb-6 flex justify-center'>
          <SelectNetwork
            selectedNetwork={selectedNetwork}
            setSelectedNetwork={setSelectedNetwork}
          />
        </div>

        {/* Wallet cards */}
        <div className='space-y-2'>
          {wallets.map((wallet, idx) => {
            return (
              <div
                key={wallet.address}
                className={`flex items-center justify-between rounded-lg border border-[#23262F] bg-[#23262F] px-3 py-3 transition-all hover:border-[#4F8CFF] hover:bg-[#232B3A]`}
              >
                <div className='flex items-center gap-3'>
                  {NetworkIcons[selectedNetwork as keyof typeof NetworkIcons]}
                  <div>
                    <div className='font-medium'>Wallet {idx + 1}</div>
                    <div
                      className='flex cursor-pointer items-center gap-1 text-xs text-[#A3AED0]'
                      onClick={e => {
                        e.stopPropagation();
                        handleCopy(wallet.address, idx);
                      }}
                    >
                      <span>
                        {wallet.address.slice(0, 4)}...
                        {wallet.address.slice(-4)}
                      </span>
                      <button
                        className='ml-1 text-[#4F8CFF] hover:underline'
                        tabIndex={0}
                      >
                        {copiedIdx === idx ? (
                          <TickIcon className='h-3.5 w-3.5 text-[#4F8CFF]' />
                        ) : (
                          <CopyToClipboardIcon className='h-3.5 w-3.5 text-[#4F8CFF]' />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='text-sm font-semibold text-[#A3AED0]'>
                    $0.00
                  </div>
                  <button className='ml-2 cursor-pointer rounded p-1 text-[#A3AED0] hover:text-white focus:outline-none'>
                    <svg width='18' height='18' fill='none' viewBox='0 0 18 18'>
                      <circle cx='9' cy='9' r='1' fill='currentColor' />
                      <circle cx='9' cy='4.5' r='1' fill='currentColor' />
                      <circle cx='9' cy='13.5' r='1' fill='currentColor' />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* Add new wallet link */}
        <button
          className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-transparent px-2 py-2 text-sm font-medium text-[#4F8CFF] hover:bg-[#23262F]'
          // onClick={...} // Add wallet logic here
        >
          + Add new<span className='capitalize'>{selectedNetwork}</span> wallet
        </button>
      </div>
    </div>
  );
}
