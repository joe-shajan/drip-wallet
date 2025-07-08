export interface Wallet {
  address: string;
  name: string;
  privateKey: string;
}

export interface Wallets {
  [network: string]: Array<Wallet>;
}

export interface WalletState {
  step: number;
  selectedNetworks: string[];
  mnemonic: string;
  seed: Buffer<ArrayBufferLike>;
  wallets: Wallets;
}

export type WalletAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_NETWORKS'; payload: string[] }
  | { type: 'SET_MNEMONIC'; payload: string }
  | { type: 'SET_SEED'; payload: Buffer<ArrayBufferLike> }
  | {
      type: 'ADD_WALLET';
      payload: {
        network: string;
        wallet: Wallet;
      };
    }
  | {
      type: 'REMOVE_WALLET';
      payload: { network: string; address: string };
    }
  | {
      type: 'RENAME_WALLET';
      payload: { network: string; address: string; name: string };
    }
  | { type: 'RESET' };
