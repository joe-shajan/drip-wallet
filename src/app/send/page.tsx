'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { sendSol } from '@/lib/solana/sendSol';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function SendPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { state } = useWallet();

  const network = params.get('network'); // 'solana' expected for now
  const fromAddress = params.get('address'); // wallet we selected
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );
  const [txSig, setTxSig] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (network !== 'solana' || !fromAddress) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-center'>
          <p className='mb-4 text-red-400'>
            Missing or unsupported query params.
          </p>
          <Button onClick={() => router.push('/wallets')}>Back</Button>
        </div>
      </div>
    );
  }

  // find the wallet so we have its private key
  const fromWallet = state.wallets['solana']?.find(
    w => w.address === fromAddress
  );

  if (!fromWallet) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-center'>
          <p className='mb-4 text-red-400'>Wallet not found in context</p>
          <Button onClick={() => router.push('/wallets')}>Back</Button>
        </div>
      </div>
    );
  }

  async function handleSend() {
    if (!fromWallet) return;

    if (Number(amount) <= 0) {
      setStatus('error');
      setErrorMsg('Amount must be greater than 0');
      return;
    }

    setStatus('sending');
    setErrorMsg('');
    try {
      const sig = await sendSol({
        fromPrivateKeyHex: fromWallet.privateKey,
        toAddress,
        amountSol: Number(amount),
      });
      setTxSig(sig);
      setStatus('sent');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-[320px] rounded-xl bg-[#181A20] p-6 shadow-xl'>
        <h2 className='mb-4 text-center text-lg font-semibold text-white'>
          Send SOL
        </h2>

        <div className='mb-4 text-xs break-all text-[#A3AED0]'>
          From&nbsp;<strong>{fromAddress}</strong>
        </div>

        <Input
          placeholder='Recipient address'
          value={toAddress}
          onChange={e => setToAddress(e.target.value.trim())}
          className='mb-3 bg-[#23262F]'
        />
        <Input
          placeholder='Amount (SOL)'
          value={amount}
          onChange={e => setAmount(e.target.value.trim())}
          className='mb-6 bg-[#23262F]'
        />

        {status === 'idle' || status === 'sending' ? (
          <Button
            className='w-full'
            disabled={status === 'sending' || !toAddress || !amount}
            onClick={handleSend}
          >
            {status === 'sending' ? 'Sending…' : 'Send'}
          </Button>
        ) : null}

        {status === 'sent' && (
          <div className='text-center text-sm text-green-400'>
            Success!{' '}
            <a
              href={`https://explorer.solana.com/tx/${txSig}?cluster=devnet`}
              target='_blank'
              rel='noreferrer'
              className='underline'
            >
              View on explorer
            </a>
          </div>
        )}

        {status === 'error' && (
          <>
            <div className='text-center text-sm text-red-400'>{errorMsg}</div>
            <a
              href={`https://explorer.solana.com/tx/${txSig}?cluster=devnet`}
              target='_blank'
              rel='noreferrer'
              className='underline'
            >
              View on explorer
            </a>
          </>
        )}

        <Button
          variant='outline'
          className='mt-4 w-full'
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

const Page = () => {
  return (
    <Suspense fallback={null}>
      <SendPage />
    </Suspense>
  );
};

export default Page;
