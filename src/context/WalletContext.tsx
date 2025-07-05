'use client'
import React, { createContext, useReducer, useContext, Dispatch, ReactNode } from 'react';
import { walletReducer, initialState, WalletState, WalletAction } from '@/reducers/walletReducer';

interface WalletContextType {
    state: WalletState;
    dispatch: Dispatch<WalletAction>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(walletReducer, initialState);

    return (
        <WalletContext.Provider value={{ state, dispatch }}>
            {children}
        </WalletContext.Provider>
    );
};

// Custom hook for easy usage
export function useWallet() {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}
