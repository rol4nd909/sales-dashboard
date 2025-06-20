import { renderHook, waitFor } from "@testing-library/react";
import { useMetricData } from "~/api/useMetricData";
import { fetchRevenue } from "~/api/fetchers";
import { MetricKey } from "~/api/types";
import { vi, test, expect } from "vitest";
import { createTestWrapper } from "~/test/utils";

test("useMetricData returns data from fetcher", async () => {
  const mockData = [
    { timestamp: "2025-06-01", value: 1234 },
    { timestamp: "2025-06-02", value: 2345 },
  ];

  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => mockData,
  });

  const { result } = renderHook(
    () =>
      useMetricData({
        key: MetricKey.Revenue,
        from: "2025-06-01",
        to: "2025-06-02",
        fetcher: fetchRevenue,
      }),
    {
      wrapper: createTestWrapper(),
    }
  );

  await waitFor(() => {
    expect(result.current.data).toEqual(mockData);
  });
});
