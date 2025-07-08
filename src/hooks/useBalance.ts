import { useQuery } from '@tanstack/react-query';
import { fetchBalance, BalanceResult } from '@/api/balance';
import { networks } from '@/types/networs';

export function useBalance(network: networks, address: string) {
  return useQuery<BalanceResult, Error>({
    queryKey: ['balance', network, address],
    queryFn: () => fetchBalance(network, address),
    enabled: !!address,
    staleTime: 30_000, // 30s
    refetchInterval: 60_000, // 1min
    throwOnError: true, // For suspense in React Query v5
  });
}
