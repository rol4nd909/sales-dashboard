/**
 * React Query hook for fetching metric data (e.g., revenue or pax) for a given date range.
 *
 * @template TData - The type of the data returned by the fetcher.
 * @param {UseMetricDataParams<TData>} params - Parameters for the hook.
 * @param {MetricKey} params.key - The metric key (e.g., 'revenue' or 'pax').
 * @param {string} params.from - Start date (YYYY-MM-DD).
 * @param {string} params.to - End date (YYYY-MM-DD).
 * @param {(from: string, to: string) => Promise<TData>} params.fetcher - Function to fetch the metric data.
 * @returns {UseQueryResult<TData, Error>} - React Query result object containing the data, loading, and error state.
 *
 * Example usage:
 *   const result = useMetricData({
 *     key: 'revenue',
 *     from: '2024-01-01',
 *     to: '2024-01-31',
 *     fetcher: fetchRevenue,
 *   });
 */
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { MetricKey } from "./types";

/**
 * Parameters for the useMetricData hook.
 * @template TData - The type of the data returned by the fetcher.
 */
interface UseMetricDataParams<TData> {
  key: MetricKey;
  from: string;
  to: string;
  fetcher: (from: string, to: string) => Promise<TData>;
}

export function useMetricData<TData>({
  key,
  from,
  to,
  fetcher,
}: UseMetricDataParams<TData>): UseQueryResult<TData, Error> {
  return useQuery<TData, Error>({
    queryKey: [key, from, to],
    queryFn: () => fetcher(from, to),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
