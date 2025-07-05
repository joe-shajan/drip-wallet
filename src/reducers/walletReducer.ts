export interface WalletState {
  step: number;
  selectedNetworks: string[];
  mnemonic: string;
  seed: Buffer<ArrayBufferLike>;
  wallets: {
    [network: string]: {
      address: string;
      name: string;
      privateKey: string;
    };
  };
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
        wallet: { address: string; name: string; privateKey: string };
      };
    }
  | { type: 'RESET' };

export const initialState: WalletState = {
  step: 0,
  selectedNetworks: [],
  mnemonic: '',
  seed: Buffer.from([]),
  wallets: {},
};

export const walletReducer = (
  state: WalletState,
  action: WalletAction
): WalletState => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };

    case 'SET_NETWORKS':
      return { ...state, selectedNetworks: action.payload };

    case 'SET_MNEMONIC':
      return { ...state, mnemonic: action.payload };

    case 'SET_SEED':
      return { ...state, seed: action.payload };

    case 'ADD_WALLET':
      return {
        ...state,
        wallets: {
          ...state.wallets,
          [action.payload.network]: action.payload.wallet,
        },
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};
