'use client';

import { useWallet } from '@/context/WalletContext';
import {
  CopyToClipboardIcon,
  NetworkIcons,
  TickIcon,
} from '@/components/icons';
import React, { useState, useRef, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAddWallet } from '@/hooks/useAddWallet';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export function SelectNetwork({
  selectedNetwork,
  setSelectedNetwork,
}: {
  selectedNetwork: string;
  setSelectedNetwork: (network: string) => void;
}) {
  const { state } = useWallet();
  const networkKeys = Object.keys(state.wallets);

  return (
    <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {networkKeys.map(key => (
            <SelectItem
              key={key}
              value={key}
              className='flex items-center gap-2 capitalize'
            >
              {NetworkIcons[key as keyof typeof NetworkIcons]}
              <span>{key}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function WalletsPage() {
  const { state, dispatch } = useWallet();
  const addWallet = useAddWallet();

  const networkKeys = Object.keys(state.wallets);
  const [selectedNetwork, setSelectedNetwork] = useState(networkKeys[0]);
  const wallets = state.wallets[selectedNetwork] || [];
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsWallet, setSettingsWallet] = useState<{
    address: string;
    idx: number;
    name: string;
  } | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [viewPK, setViewPK] = useState(false);
  const [pkChecked, setPkChecked] = useState(false);
  const [pkCopied, setPkCopied] = useState(false);

  useEffect(() => {
    if (!Object.keys(state.wallets).includes(selectedNetwork)) {
      const first = Object.keys(state.wallets)[0] || '';
      setSelectedNetwork(first);
    }
  }, [state.wallets, selectedNetwork]);

  const handleCopy = (address: string, idx: number) => {
    navigator.clipboard.writeText(address);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const handleRemove = () => {
    if (settingsWallet) {
      dispatch({
        type: 'REMOVE_WALLET',
        payload: { network: selectedNetwork, address: settingsWallet.address },
      });
      setSettingsOpen(false);
      setSettingsWallet(null);
    }
  };

  const handleRename = () => {
    if (settingsWallet && renameValue.trim()) {
      dispatch({
        type: 'RENAME_WALLET',
        payload: {
          network: selectedNetwork,
          address: settingsWallet.address,
          name: renameValue.trim(),
        },
      });
      setRenaming(false);
      setSettingsOpen(false);
      setSettingsWallet(null);
    }
  };

  const getCurrentWallet = () => {
    if (!settingsWallet) return null;
    const list = state.wallets[selectedNetwork] || [];
    return list.find(w => w.address === settingsWallet.address) || null;
  };

  const handleCopyPK = () => {
    const w = getCurrentWallet();
    if (w) {
      navigator.clipboard.writeText(w.privateKey);
      setPkCopied(true);
      setTimeout(() => setPkCopied(false), 1500);
    }
  };

  return (
    <div className='bg-background flex min-h-screen items-center justify-center'>
      <div className='w-md rounded-xl bg-[#181A20] p-6 shadow-xl'>
        <div className='relative mb-6 flex items-center justify-center'>
          <span className='text-lg font-semibold'>Wallets</span>
        </div>
        <div className='mb-6 flex justify-center'>
          <SelectNetwork
            selectedNetwork={selectedNetwork}
            setSelectedNetwork={setSelectedNetwork}
          />
        </div>

        {/* Wallet cards */}
        <div className='mt-6 space-y-4'>
          {wallets.map((wallet, idx) => (
            <div
              key={wallet.address}
              className={`flex items-center justify-between rounded-lg border border-[#23262F] bg-[#23262F] px-3 py-3 transition-all hover:border-[#4F8CFF] hover:bg-[#232B3A]`}
            >
              <div className='flex items-center gap-3'>
                {NetworkIcons[selectedNetwork as keyof typeof NetworkIcons]}
                <div>
                  <div className='font-medium'>
                    {wallet.name || `Wallet ${idx + 1}`}
                  </div>
                  <div
                    className='flex cursor-pointer items-center gap-1 text-xs text-[#A3AED0]'
                    onClick={e => {
                      e.stopPropagation();
                      handleCopy(wallet.address, idx);
                    }}
                  >
                    <span>
                      {wallet.address.slice(0, 6)}...
                      {wallet.address.slice(-6)}
                    </span>
                    <button
                      className='ml-1 text-[#4F8CFF] hover:underline'
                      tabIndex={0}
                    >
                      {copiedIdx === idx ? (
                        <TickIcon className='h-3.5 w-3.5 text-[#4F8CFF]' />
                      ) : (
                        <CopyToClipboardIcon className='h-3.5 w-3.5 text-[#4F8CFF]' />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div className='text-sm font-semibold text-[#A3AED0]'>
                  $0.00
                </div>
                <button
                  onClick={() => {
                    setSettingsWallet({
                      address: wallet.address,
                      idx,
                      name: wallet.name,
                    });
                    setSettingsOpen(true);
                  }}
                  className='ml-auto rounded-full p-2 hover:bg-[#23262F]'
                  aria-label='Wallet settings'
                >
                  <svg width='18' height='18' fill='none' viewBox='0 0 18 18'>
                    <circle cx='9' cy='3.5' r='1.5' fill='#A3AED0' />
                    <circle cx='9' cy='9' r='1.5' fill='#A3AED0' />
                    <circle cx='9' cy='14.5' r='1.5' fill='#A3AED0' />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Add new wallet link */}
        <button
          className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-transparent px-2 py-2 text-sm font-medium text-[#4F8CFF] hover:bg-[#23262F]'
          onClick={() => {
            addWallet(selectedNetwork);
          }}
        >
          + Add new<span className='capitalize'>{selectedNetwork}</span> wallet
        </button>
      </div>
      <Drawer
        open={settingsOpen}
        onOpenChange={open => {
          setSettingsOpen(open);
          if (!open) {
            setRenaming(false);
            setRenameValue('');
            setSettingsWallet(null);
          }
        }}
      >
        <DrawerContent className='mx-auto max-w-md'>
          <DrawerHeader>
            <DrawerTitle>{settingsWallet?.name} Settings</DrawerTitle>
            <DrawerDescription>
              {settingsWallet?.address && (
                <span className='text-muted-foreground text-xs break-all'>
                  {settingsWallet.address}
                </span>
              )}
            </DrawerDescription>
          </DrawerHeader>
          <div className='flex flex-col gap-4 p-4'>
            {viewPK ? (
              <>
                <div className='flex flex-col items-center gap-2 text-center'>
                  <svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M12 5c5 0 9 4 9 7 0 3-4 7-9 7s-9-4-9-7c0-3 4-7 9-7Z'
                      stroke='#FFFFFF'
                      strokeWidth='1.5'
                    />
                    <circle
                      cx='12'
                      cy='12'
                      r='3'
                      stroke='#FFFFFF'
                      strokeWidth='1.5'
                    />
                  </svg>
                  <h3 className='text-lg font-semibold'>Your Private Key</h3>
                  <p className='text-muted-foreground text-xs'>
                    Never give out your private key to anyone.
                  </p>
                </div>
                <div className='border-border rounded-md border bg-[#141619] p-3 text-xs break-all'>
                  {getCurrentWallet()?.privateKey}
                </div>
                <div className='flex items-start gap-2'>
                  <Checkbox
                    id='pkconfirm'
                    checked={pkChecked}
                    onCheckedChange={v => setPkChecked(!!v)}
                  />
                  <label
                    htmlFor='pkconfirm'
                    className='text-muted-foreground text-xs leading-tight'
                  >
                    I understand that copying my secret may expose it to other
                    apps and devices.
                  </label>
                </div>
                <Button
                  className='w-full'
                  disabled={!pkChecked}
                  onClick={handleCopyPK}
                >
                  {pkCopied ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={() => {
                    setViewPK(false);
                    setPkChecked(false);
                  }}
                >
                  Back
                </Button>
              </>
            ) : (
              <>
                {renaming ? (
                  <div className='flex gap-2'>
                    <input
                      ref={inputRef}
                      className='border-border flex-1 rounded-md border bg-[#23262F] px-3 py-2 text-white focus:ring-2 focus:ring-[#4F8CFF] focus:outline-none'
                      value={renameValue}
                      onChange={e => setRenameValue(e.target.value)}
                      placeholder='Enter new wallet name'
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleRename();
                        if (e.key === 'Escape') setRenaming(false);
                      }}
                      autoFocus
                    />
                    <Button
                      size='sm'
                      onClick={handleRename}
                      disabled={!renameValue.trim()}
                    >
                      Save
                    </Button>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => setRenaming(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant='ghost'
                    className='w-full bg-[#23262F] text-left hover:bg-[#2A2D36]'
                    onClick={() => {
                      setRenaming(true);
                      setRenameValue(settingsWallet?.name || '');
                      setTimeout(() => inputRef.current?.focus(), 100);
                    }}
                  >
                    Rename
                  </Button>
                )}
                <Button
                  variant='ghost'
                  className='w-full bg-[#23262F] text-left hover:bg-[#2A2D36]'
                  onClick={() => {
                    setViewPK(true);
                  }}
                >
                  Show Private Key
                </Button>
                <Button
                  variant='destructive'
                  className='w-full text-left'
                  onClick={handleRemove}
                >
                  Remove Wallet
                </Button>
                <DrawerClose asChild>
                  <Button variant='outline' className='mt-4 w-full'>
                    Close
                  </Button>
                </DrawerClose>
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
