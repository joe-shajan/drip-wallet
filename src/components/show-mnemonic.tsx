// In ShowMnemonic.tsx
import { useEffect, useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { generateMnemonic, mnemonicToSeed } from 'bip39'; // or your lib
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

export default function ShowMnemonic({ onNext }: { onNext: () => void }) {
  const { state, dispatch } = useWallet();
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!state.mnemonic) {
      (async () => {
        const mnemonic = generateMnemonic();
        const seed = await mnemonicToSeed(mnemonic);
        dispatch({ type: 'SET_MNEMONIC', payload: mnemonic });
        dispatch({ type: 'SET_SEED', payload: seed });
      })();
    }
  }, [state.mnemonic, dispatch]);

  // Split mnemonic into words
  const words = state.mnemonic ? state.mnemonic.split(' ') : Array(12).fill('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(state.mnemonic || '');
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  return (
    <div className='flex flex-col items-center'>
      <h2 className='mb-2 text-[22px] font-semibold'>Secret Recovery Phrase</h2>
      <p className='mb-8 max-w-xs text-center text-[15px] text-[#B1B5C3]'>
        Save these words in a safe place.
      </p>
      <div
        className='mb-4 flex w-full max-w-md flex-col items-center rounded-xl bg-[#181A20] p-4 shadow-md'
        onClick={copyToClipboard}
      >
        <div className='grid w-full grid-cols-3 gap-x-12 gap-y-6'>
          {words.map((word, i) => (
            <div
              key={i}
              className='flex items-center gap-2 text-sm text-white/90'
            >
              <span className='w-5 text-right text-[#B1B5C3]'>{i + 1}</span>
              <span className='font-medium select-all'>{word}</span>
            </div>
          ))}
        </div>
        <div
          className={`mt-4 w-full text-center text-xs text-[#B1B5C3] transition-opacity duration-300 ease-in-out ${isCopied ? 'opacity-100' : 'opacity-80'}`}
        >
          {isCopied
            ? 'Copied to clipboard'
            : 'Click anywhere on this card to copy'}
        </div>
      </div>
      <div className='mt-2 mb-4 flex items-center gap-2'>
        <Checkbox
          id='mnemonic-saved'
          className='h-4 w-4 accent-[#4F8CFF]'
          checked={isSaved}
          onCheckedChange={() => setIsSaved(!isSaved)}
        />
        <label
          htmlFor='mnemonic-saved'
          className='text-sm text-[#B1B5C3] select-none'
        >
          I saved my secret recovery phrase
        </label>
      </div>
      <Button
        disabled={!isSaved}
        variant='outline'
        className='mt-2 w-full max-w-md'
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
}
