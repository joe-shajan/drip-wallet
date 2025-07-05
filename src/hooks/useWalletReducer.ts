import { useReducer } from 'react';
import { walletReducer, initialState } from '@/reducers/walletReducer';

export function useWalletReducer() {
  return useReducer(walletReducer, initialState);
}
