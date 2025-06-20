// API fetchers for metric data from the backend service.
//
// Provides functions to fetch revenue and passenger (pax) metrics for a given date range.
//
// Usage:
//   import { fetchRevenue, fetchPax } from './fetchers';
//   const data = await fetchRevenue('2024-01-01', '2024-01-31');

import type { MetricItem } from "./types";

/**
 * Base URL for the backend API endpoints.
 * @constant {string}
 */
const BASE_URL = "http://localhost:8080/api";

/**
 * Generic function to fetch data from a given URL and parse the response as JSON.
 * Throws an error if the response is not OK.
 *
 * @template T - The expected response type.
 * @param {string} url - The endpoint URL to fetch data from.
 * @returns {Promise<T>} - The parsed JSON response.
 * @throws {Error} - If the fetch fails or the response is not OK.
 */
async function fetchData<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`[API error] ${url}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`[fetchData] ${url}`, err);
    throw err;
  }
}

/**
 * Fetches total revenue metric data for a given date range.
 *
 * @param {string} from - Start date (YYYY-MM-DD).
 * @param {string} to - End date (YYYY-MM-DD).
 * @returns {Promise<MetricItem[]>} - Array of revenue metric items.
 */
export function fetchRevenue(from: string, to: string): Promise<MetricItem[]> {
  const url = `${BASE_URL}/total-revenue?from=${from}&to=${to}`;
  return fetchData(url);
}

/**
 * Fetches total passenger (pax) metric data for a given date range.
 *
 * @param {string} from - Start date (YYYY-MM-DD).
 * @param {string} to - End date (YYYY-MM-DD).
 * @returns {Promise<MetricItem[]>} - Array of pax metric items.
 */
export function fetchPax(from: string, to: string): Promise<MetricItem[]> {
  const url = `${BASE_URL}/total-pax?from=${from}&to=${to}`;
  return fetchData(url);
}
