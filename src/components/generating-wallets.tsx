import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { generateWalletForNetwork } from '@/lib/generateWallets';
import { TickIcon } from './icons';

export default function GeneratingWallets() {
  const { state, dispatch } = useWallet();
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    (async () => {
      for (const network of state.selectedNetworks) {
        const wallet = await generateWalletForNetwork(network, state.seed);
        dispatch({ type: 'ADD_WALLET', payload: { network, wallet } });
      }
      setTimeout(() => {
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/wallets');
        }, 1000);
      }, 2000);
    })();
  }, []);

  return (
    <div className='mt-10 flex flex-col items-center justify-center'>
      <div className='mb-10 flex h-16 w-16 items-center justify-center'>
        {isSuccess ? (
          <TickIcon />
        ) : (
          <div className='h-16 w-16 animate-spin rounded-full border-b-2 border-[#4F8CFF]'></div>
        )}
      </div>
      <h2 className='mb-2 text-[22px] font-semibold'>
        {isSuccess ? 'Wallets generated.' : 'Generating wallets...'}
      </h2>
      <p className='max-w-xs text-center text-[15px] text-[#B1B5C3]'>
        {isSuccess
          ? 'Your wallets have been successfully generated.'
          : 'Please wait while we generate your wallets.'}
      </p>
    </div>
  );
}
