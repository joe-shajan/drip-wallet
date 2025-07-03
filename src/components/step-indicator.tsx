import React from 'react';

interface StepIndicatorProps {
    totalSteps: number;
    currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ totalSteps, currentStep }) => {
    return (
        <div className="flex gap-2 mb-8">
            {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i === currentStep ? 'bg-[#4F8CFF]' : 'bg-[#2C2F36]'}`}
                />
            ))}
        </div>
    );
};

export default StepIndicator; 
