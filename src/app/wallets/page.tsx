'use client';

import { useWallet } from '@/context/WalletContext';
import { NetworkIcons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

export default function WalletsPage() {
  const { state } = useWallet();

  const NETWORKS = Object.keys(state.wallets).map(network => ({
    name: network,
    icon: NetworkIcons[network as keyof typeof NetworkIcons],
  }));

  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0].name);
  console.log(state);

  const wallets = state.wallets[selectedNetwork] || [];
  console.log(wallets);

  return (
    <div className='mx-auto mt-8 w-[350px] rounded-xl bg-[#181A20] p-4 text-white shadow-lg'>
      <div className='mb-4 flex items-center justify-between'>
        <span className='text-lg font-semibold'>Wallets</span>
        <select
          className='rounded-md bg-[#23262F] px-2 py-1 text-white focus:outline-none'
          value={selectedNetwork}
          onChange={e => setSelectedNetwork(e.target.value)}
        >
          {NETWORKS.map(net => (
            <option key={net.name} value={net.name}>
              {net.name}
            </option>
          ))}
        </select>
      </div>
      <div className='space-y-2'>
        {wallets.map((wallet, idx) => (
          <div
            key={wallet.address}
            className={`flex items-center justify-between rounded-lg border ${idx === 0 ? 'border-[#4F8CFF]' : 'border-[#23262F]'} bg-[#23262F] px-3 py-2`}
          >
            <div className='flex items-center gap-2'>
              {NETWORKS.find(net => net.name === selectedNetwork)?.icon}
              <div>
                <div className='font-medium'>Wallet {idx + 1}</div>
                <div className='flex items-center gap-1 text-xs text-[#A3AED0]'>
                  <span>
                    {wallet.address.slice(0, 4)}...{wallet.address.slice(-4)}
                  </span>
                  <button
                    className='ml-1 text-[#4F8CFF] hover:underline'
                    onClick={() =>
                      navigator.clipboard.writeText(wallet.address)
                    }
                  >
                    <svg width='14' height='14' fill='none' viewBox='0 0 14 14'>
                      <path
                        d='M4.667 2.333A1.333 1.333 0 0 0 3.334 3.667v7a1.333 1.333 0 0 0 1.333 1.333h5a1.333 1.333 0 0 0 1.333-1.333v-7A1.333 1.333 0 0 0 9.667 2.333h-5Zm0 0V1.667A1.667 1.667 0 0 1 6.334 0h1.333A1.667 1.667 0 0 1 9.334 1.667v.666'
                        stroke='#4F8CFF'
                        strokeWidth='1.2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className='text-right'>
              <div className='text-sm font-semibold'>$0.00</div>
              <button className='ml-2 text-[#A3AED0] hover:text-white'>
                <svg width='18' height='18' fill='none' viewBox='0 0 18 18'>
                  <circle cx='9' cy='9' r='1' fill='currentColor' />
                  <circle cx='9' cy='4.5' r='1' fill='currentColor' />
                  <circle cx='9' cy='13.5' r='1' fill='currentColor' />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-transparent px-2 py-2 text-[#4F8CFF] hover:bg-[#23262F]'
        // onClick={...} // Add wallet logic here
      >
        + Add new {selectedNetwork} wallet
      </button>
    </div>
  );
}
