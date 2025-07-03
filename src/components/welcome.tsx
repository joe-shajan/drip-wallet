'use client'

import React from 'react';
import { HoverBorderGradient } from './ui/hover-border-gradient';

const Welcome: React.FC = () => {
    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center font-sans">
            {/* Progress dots */}
            <div className="flex gap-2 mb-8">
                {[0, 1, 2, 3].map(i => (
                    <div
                        key={i}
                        className={
                            `w-2 h-2 rounded-full ` +
                            (i === 0 ? 'bg-[#4F8CFF]' : 'bg-[#2C2F36]')
                        }
                    />
                ))}
            </div>
            {/* Lock icon */}
            <div className="mb-6">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="#23262F" />
                    <rect x="16" y="22" width="16" height="12" rx="3" fill="#4F8CFF" />
                    <rect x="20" y="18" width="8" height="8" rx="4" fill="#23262F" />
                </svg>
            </div>
            {/* Title */}
            <h2 className="m-0 font-semibold text-[22px]">Welcome to Web based wallet</h2>
            {/* Subtitle */}
            <p className="mt-3 mb-8 text-[#B1B5C3] text-[15px] text-center max-w-xs">
                You&apos;ll use this wallet to send and receive crypto and NFTs
            </p>
            {/* Buttons */}
            <div className="flex justify-center text-center">
                <HoverBorderGradient
                    containerClassName="rounded-lg"
                    as="button"
                    className="bg-black text-white flex items-center space-x-2"
                >
                    <span>Create a new wallet</span>
                </HoverBorderGradient>
            </div>
        </div>
    );
};

export default Welcome;
