import { networks } from './networs';

export interface Wallet {
  address: string;
  name: string;
  privateKey: string;
}

export type Wallets = {
  [network in networks]: Array<Wallet>;
};

export interface WalletState {
  step: number;
  selectedNetworks: networks[];
  mnemonic: string;
  seed: Buffer<ArrayBufferLike>;
  wallets: Wallets;
}

export type WalletAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_NETWORKS'; payload: networks[] }
  | { type: 'SET_MNEMONIC'; payload: string }
  | { type: 'SET_SEED'; payload: Buffer<ArrayBufferLike> }
  | {
      type: 'ADD_WALLET';
      payload: {
        network: networks;
        wallet: Wallet;
      };
    }
  | {
      type: 'REMOVE_WALLET';
      payload: { network: networks; address: string };
    }
  | {
      type: 'RENAME_WALLET';
      payload: { network: networks; address: string; name: string };
    }
  | { type: 'RESET' };
