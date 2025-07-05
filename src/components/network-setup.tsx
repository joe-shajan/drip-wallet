'use client'
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
            type: 'SET_NETWORKS', payload: state.selectedNetworks.includes(key)
                ? state.selectedNetworks.filter((k) => k !== key)
                : [...state.selectedNetworks, key]
        });
    };

    return (
        <div className="flex flex-col items-center justify-center font-sans text-white">
            <h2 className="font-semibold text-[22px] mb-1">Set up networks</h2>
            <p className="mb-6 text-[#B1B5C3] text-[15px] text-center max-w-xs">You can always add and remove later.</p>
            <div className="w-full max-w-xs flex flex-col gap-4 mb-8">
                {networks.map((network) => {
                    const selected = state.selectedNetworks.includes(network.key);
                    return (
                        <div
                            key={network.key}
                            className="relative rounded-xl overflow-hidden cursor-pointer"
                            onClick={() => toggleNetwork(network.key)}
                        >
                            <div className="flex items-center gap-3 px-4 py-3 relative z-10 bg-background dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-xl">
                                {/* Selection indicator */}
                                <span className={`flex items-center justify-center w-4 h-4 rounded-full border-2 mr-2 border-[#35373B] ${selected ? ' bg-white' : ' bg-transparent'}`}>
                                    {selected && <span className="w-2 h-2 rounded-full bg-white block" />}
                                </span>
                                <network.icon />
                                <span className="font-medium text-base">{network.name}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Button variant="outline" className='mt-8 w-full' onClick={onNext}>Set up wallets</Button>
        </div>
    );
};

export default NetworkSetup;
