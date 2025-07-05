import React from 'react';
import { Button } from './ui/button';

const Welcome: React.FC<{ onNext?: () => void }> = ({ onNext }) => {
  return (
    <div className='flex flex-col items-center justify-center font-sans text-white'>
      {/* Lock icon */}
      <div className='mb-6'>
        <svg width='48' height='48' viewBox='0 0 48 48' fill='none'>
          <circle cx='24' cy='24' r='24' fill='#23262F' />
          <rect x='16' y='22' width='16' height='12' rx='3' fill='#4F8CFF' />
          <rect x='20' y='18' width='8' height='8' rx='4' fill='#23262F' />
        </svg>
      </div>
      {/* Title */}
      <h2 className='m-0 text-[22px] font-semibold'>
        Welcome to Web based wallet
      </h2>
      {/* Subtitle */}
      <p className='mt-3 mb-8 max-w-xs text-center text-[15px] text-[#B1B5C3]'>
        You&apos;ll use this wallet to send and receive crypto and NFTs
      </p>
      {/* Buttons */}
      <div className='flex justify-center text-center'>
        <Button variant='outline' className='mt-24' onClick={onNext}>
          Create a new wallet
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
