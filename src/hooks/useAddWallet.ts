import { useWallet } from '@/context/WalletContext';
import { generateWalletForNetwork } from '@/lib/generateWallets';

export function useAddWallet() {
  const { state, dispatch } = useWallet();

  async function addWallet(network: string) {
    const wallet = await generateWalletForNetwork(
      network,
      state.seed,
      state.wallets[network]?.length || 0
    );
    dispatch({ type: 'ADD_WALLET', payload: { network, wallet } });
  }

  return addWallet;
}
