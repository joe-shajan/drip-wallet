import { useEffect } from 'react';

import { useWallet } from '@/context/WalletContext';
import { generateWalletForNetwork } from '@/lib/generateWallets';

export default function GeneratingWallets({ onNext }: { onNext: () => void }) {
  const { state, dispatch } = useWallet();

  useEffect(() => {
    (async () => {
      for (const network of state.selectedNetworks) {
        const wallet = await generateWalletForNetwork(network, state.seed);
        dispatch({ type: 'ADD_WALLET', payload: { network, wallet } });
      }

      onNext();
    })();
  }, [state.selectedNetworks, state.seed, dispatch, onNext]);

  return (
    <div className='mt-10 flex flex-col items-center justify-center'>
      <div className='mb-10 h-16 w-16 animate-spin rounded-full border-b-2 border-[#4F8CFF]'></div>
      <h2 className='mb-2 text-[22px] font-semibold'>Generating wallets...</h2>
      <p className='max-w-xs text-center text-[15px] text-[#B1B5C3]'>
        Please wait while we generate your wallets.
      </p>
    </div>
  );
}
