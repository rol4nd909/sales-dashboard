/**
 * useMetricData hook
 *
 * React Query hook for fetching metric data (e.g., revenue or pax) for a given date range.
 *
 * Features:
 *   - Accepts a metric key, date range, and a fetcher function
 *   - Returns a React Query result object with data, loading, and error states
 *   - Configured with a 5-minute stale time, 1 retry, and no refetch on window focus
 *
 * @param {Object} params - Parameters for the hook
 * @param {MetricKey} params.key - The metric key (e.g., 'revenue' or 'pax')
 * @param {string} params.from - Start date (YYYY-MM-DD)
 * @param {string} params.to - End date (YYYY-MM-DD)
 * @param {(from: string, to: string) => Promise<MetricItem[]>} params.fetcher - Function to fetch the metric data
 * @returns {UseQueryResult<MetricItem[], Error>} - React Query result object containing the data, loading, and error state
 *
 * @example
 *   const result = useMetricData({
 *     key: 'revenue',
 *     from: '2024-01-01',
 *     to: '2024-01-31',
 *     fetcher: fetchRevenue,
 *   });
 */
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { MetricItem, MetricKey } from "./types";

/**
 * Parameters for the useMetricData hook.
 */
interface UseMetricDataParams {
  key: MetricKey;
  from: string;
  to: string;
  fetcher: (from: string, to: string) => Promise<MetricItem[]>;
}

export function useMetricData({
  key,
  from,
  to,
  fetcher,
}: UseMetricDataParams): UseQueryResult<MetricItem[], Error> {
  return useQuery<MetricItem[], Error>({
    queryKey: [key, from, to],
    queryFn: () => fetcher(from, to),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
