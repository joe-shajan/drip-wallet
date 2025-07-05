'use client';
import React from 'react';
import {
  Welcome,
  NetworkSetup,
  StepIndicator,
  ShowMnemonic,
  GeneratingWallets,
} from '@/components';
import { useWallet } from '@/context/WalletContext';

const steps = [
  { component: Welcome },
  { component: NetworkSetup },
  { component: ShowMnemonic },
  { component: GeneratingWallets },
];

export default function OnboardingSteps() {
  const { state, dispatch } = useWallet();
  const totalSteps = steps.length;

  const goNext = () => {
    if (state.step < totalSteps - 1) {
      dispatch({ type: 'SET_STEP', payload: state.step + 1 });
    }
  };

  const StepComponent = steps[state.step].component;

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <div className='flex flex-col items-center'>
        <StepIndicator totalSteps={totalSteps} currentStep={state.step} />
        <StepComponent onNext={goNext} />
      </div>
    </div>
  );
}
