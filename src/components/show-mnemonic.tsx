// In ShowMnemonic.tsx
import { useEffect, useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { generateMnemonic, mnemonicToSeed } from 'bip39'; // or your lib
import { Button } from './ui/button';

export default function ShowMnemonic({ onNext }: { onNext: () => void }) {
    const { state, dispatch } = useWallet();
    const [isCopied, setIsCopied] = useState(false);
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
    }
    return (
        <div className="flex flex-col items-center">
            <h2 className="font-semibold text-[22px] mb-2">Secret Recovery Phrase</h2>
            <p className="mb-8 text-[#B1B5C3] text-[15px] text-center max-w-xs">
                Save these words in a safe place.
            </p>
            <div className="w-full max-w-md bg-[#181A20] rounded-xl p-4 mb-4 flex flex-col items-center shadow-md" onClick={copyToClipboard}>
                <div className="grid grid-cols-3 gap-x-12 gap-y-6 w-full">
                    {words.map((word, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-white/90">
                            <span className="text-[#B1B5C3] w-5 text-right">{i + 1}</span>
                            <span className="font-medium select-all">{word}</span>
                        </div>
                    ))}
                </div>
                <div className="text-xs text-[#B1B5C3] mt-4 w-full text-center opacity-80">
                    {isCopied ? 'Copied to clipboard' : 'Click anywhere on this card to copy'}
                </div>
            </div>
            <div className="flex items-center gap-2 mb-4 mt-2">
                <input type="checkbox" id="mnemonic-saved" className="accent-[#4F8CFF] w-4 h-4" />
                <label htmlFor="mnemonic-saved" className="text-[#B1B5C3] text-sm select-none">I saved my secret recovery phrase</label>
            </div>
            <Button variant="outline" className='mt-2 w-full max-w-md' onClick={onNext}>Next</Button>
        </div>
    );
}
