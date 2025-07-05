export interface WalletState {
  step: number;
  selectedNetworks: string[];
  mnemonic: string;
  seed: Buffer<ArrayBufferLike>;
  wallets: {
    [network: string]: Array<{
      address: string;
      name: string;
      privateKey: string;
    }>;
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
  | {
      type: 'REMOVE_WALLET';
      payload: { network: string; address: string };
    }
  | {
      type: 'RENAME_WALLET';
      payload: { network: string; address: string; name: string };
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
          [action.payload.network]: [
            ...(state.wallets[action.payload.network] || []),
            action.payload.wallet,
          ],
        },
      };

    case 'REMOVE_WALLET': {
      const { network, address } = action.payload;
      const updatedList = (state.wallets[network] || []).filter(
        w => w.address !== address
      );

      // Clone wallets map so we can mutate safely
      const newWallets = { ...state.wallets };
      if (updatedList.length) {
        newWallets[network] = updatedList;
      } else {
        delete newWallets[network];
      }

      return {
        ...state,
        wallets: newWallets,
      };
    }

    case 'RENAME_WALLET': {
      const { network, address, name } = action.payload;
      return {
        ...state,
        wallets: {
          ...state.wallets,
          [network]: (state.wallets[network] || []).map(w =>
            w.address === address ? { ...w, name } : w
          ),
        },
      };
    }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};
