'use client';

import React from 'react';

// You can replace this with your own SVG or icon component
function ErrorIcon() {
  return (
    <svg width='40' height='40' viewBox='0 0 24 24' fill='none'>
      <circle cx='12' cy='12' r='12' fill='#F87171' />
      <path d='M12 7v5' stroke='#fff' strokeWidth='2' strokeLinecap='round' />
      <circle cx='12' cy='16' r='1' fill='#fff' />
    </svg>
  );
}

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Optionally log error to an error reporting service
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='flex flex-col items-center justify-center p-4 text-center text-red-500'>
            <ErrorIcon />
            <h2 className='mt-2 text-lg font-semibold'>
              Something went wrong.
            </h2>
            <p className='mb-2 text-sm text-red-400'>
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              className='mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
              onClick={this.handleRetry}
            >
              Retry
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
