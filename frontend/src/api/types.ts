/**
 * Represents a single metric data point.
 * @property {string} timestamp - ISO 8601 formatted date string for the metric.
 * @property {number} value - The value of the metric at the given timestamp.
 */
export type MetricItem = {
  timestamp: string;
  value: number;
};

/**
 * Enum-like object for supported metric keys.
 * - Revenue: total revenue metric
 * - Pax: total passengers metric
 */
export const MetricKey = {
  Revenue: "revenue",
  Pax: "pax",
} as const;

/**
 * Type representing the possible metric key values.
 * Can be either "revenue" or "pax".
 */
export type MetricKey = (typeof MetricKey)[keyof typeof MetricKey];
