import { WalletAction, WalletState } from '@/types/wallet';

export const initialState: WalletState = {
  step: 0,
  selectedNetworks: [],
  mnemonic: '',
  seed: Buffer.from([]),
  wallets: {
    solana: [],
    ethereum: [],
  },
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
