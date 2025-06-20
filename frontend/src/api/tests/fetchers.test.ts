import { vi, test, expect } from "vitest";
import { fetchRevenue } from "~/api/fetchers";

test("fetchRevenue throws on fetch failure", async () => {
  global.fetch = vi.fn().mockRejectedValueOnce(new Error("Network error"));

  await expect(fetchRevenue("2025-06-01", "2025-06-03")).rejects.toThrow(
    "Network error"
  );

  expect(global.fetch).toHaveBeenCalledOnce();
});

test("fetchRevenue throws on non-OK response", async () => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: false,
    status: 500,
    statusText: "Internal Server Error",
  });

  await expect(fetchRevenue("2025-06-01", "2025-06-03")).rejects.toThrow(
    "[API error]"
  );

  expect(global.fetch).toHaveBeenCalledOnce();
});

test("fetchRevenue returns API data on success", async () => {
  const fakeResponse = [
    { timestamp: "2025-06-01", value: 1234 },
    { timestamp: "2025-06-02", value: 2345 },
  ];

  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => fakeResponse,
  });

  const data = await fetchRevenue("2025-06-01", "2025-06-02");

  expect(data).toEqual(fakeResponse);
});
