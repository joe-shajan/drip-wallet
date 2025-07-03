'use client'
import Welcome from '@/components/welcome';
import NetworkSetup from '@/components/network-setup';
import StepIndicator from '@/components/step-indicator';
import React, { useState } from 'react';

const steps = [
  { component: Welcome },
  { component: NetworkSetup },
];

export default function OnboardingSteps() {
  const [step, setStep] = useState(0);
  const totalSteps = steps.length;

  const goNext = () => {
    if (step < totalSteps - 1) setStep(step + 1);
  };

  const StepComponent = steps[step].component;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <StepIndicator totalSteps={totalSteps} currentStep={step} />
        <StepComponent onNext={goNext} />
      </div>
    </div>
  );
}
