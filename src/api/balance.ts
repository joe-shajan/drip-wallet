import axios from 'axios';
import { networks } from '@/types/networs';

export type BalanceResult = {
  lamports?: number; // For Solana
  wei?: string; // For Ethereum
  error?: string;
};

const SOLANA_URL =
  'https://solana-mainnet.g.alchemy.com/v2/7NsD1ojLjbToYk3irqgL_XA_31-CL5nr';
const ETHEREUM_URL =
  'https://eth-mainnet.g.alchemy.com/v2/7NsD1ojLjbToYk3irqgL_XA_31-CL5nr';

export async function fetchBalance(
  network: networks,
  address: string
): Promise<BalanceResult> {
  if (network === 'solana') {
    const { data } = await axios.post(SOLANA_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'getBalance',
      params: [address],
    });
    return { lamports: data.result.value };
  } else if (network === 'ethereum') {
    const { data } = await axios.post(ETHEREUM_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });
    return { wei: data.result };
  }
  return { error: 'Unsupported network' };
}
