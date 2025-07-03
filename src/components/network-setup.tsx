'use client'
import React, { useState } from 'react';
import { Button } from './ui/button';

const networks = [
    {
        name: 'Solana',
        key: 'solana',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <defs>
                    <linearGradient id="solana-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9945FF" />
                        <stop offset="1" stopColor="#14F195" />
                    </linearGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="#19161C" />
                <path d="M7 8.5C7.1 8.2 7.4 8 7.7 8h8.6c.4 0 .6.4.3.7l-1.2 1.3c-.1.1-.2.1-.3.1H6.5c-.4 0-.6-.4-.3-.7L7 8.5Z" fill="url(#solana-gradient)" />
                <path d="M7 14.5C7.1 14.2 7.4 14 7.7 14h8.6c.4 0 .6.4.3.7l-1.2 1.3c-.1.1-.2.1-.3.1H6.5c-.4 0-.6-.4-.3-.7L7 14.5Z" fill="url(#solana-gradient)" />
                <path d="M17 11.2c-.1-.2-.3-.2-.5-.2H7.9c-.4 0-.6.4-.3.7l1.2 1.3c.1.1.2.1.3.1h8.3c.4 0 .6-.4.3-.7l-1.2-1.2Z" fill="url(#solana-gradient)" />
            </svg>
        ),
    },
    {
        name: 'Ethereum',
        key: 'ethereum',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#19161C" />
                <path d="M12 5v7.1l5 2.2L12 5Z" fill="#8C8C8C" />
                <path d="M12 5 7 14.3l5-2.2V5Z" fill="#343434" />
                <path d="M12 19v-4.1l5-2.9-5 7Z" fill="#3C3C3B" />
                <path d="M12 19l-5-7 5 2.9V19Z" fill="#8C8C8C" />
                <path d="M12 16.2 7 13.3l5-2.2 5 2.2-5 2.9Z" fill="#141414" />
            </svg>
        ),
    },
];

const NetworkSetup: React.FC<{ onNext?: () => void }> = ({ onNext }) => {
    const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);

    const toggleNetwork = (key: string) => {
        setSelectedNetworks((prev) =>
            prev.includes(key)
                ? prev.filter((k) => k !== key)
                : [...prev, key]
        );
    };

    return (
        <div className="flex flex-col items-center justify-center font-sans text-white">
            <h2 className="font-semibold text-[22px] mb-1">Set up networks</h2>
            <p className="mb-6 text-[#B1B5C3] text-[15px] text-center max-w-xs">You can always add and remove later.</p>
            <div className="w-full max-w-xs flex flex-col gap-4 mb-8">
                {networks.map((network) => {
                    const selected = selectedNetworks.includes(network.key);
                    return (
                        <div
                            key={network.key}
                            className="relative rounded-xl overflow-hidden cursor-pointer"
                            onClick={() => toggleNetwork(network.key)}
                        >
                            <div className="flex items-center gap-3 px-4 py-3 relative z-10 bg-[#181A20] rounded-xl">
                                {/* Selection indicator */}
                                <span className={`flex items-center justify-center w-4 h-4 rounded-full border-2 mr-2 border-[#35373B] ${selected ? ' bg-white' : ' bg-transparent'}`}>
                                    {selected && <span className="w-2 h-2 rounded-full bg-white block" />}
                                </span>
                                {network.icon}
                                <span className="font-medium text-base">{network.name}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Button variant="outline" className='mt-8' onClick={onNext}>Set up wallets</Button>
        </div>
    );
};

export default NetworkSetup;
