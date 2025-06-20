/**
 * ValueFormat type
 * - "currency": Format as a currency string (e.g., "$1,000")
 * - "compact": Format as a compact number (e.g., "1K")
 */
export type ValueFormat = "currency" | "compact";

/**
 * Options for formatting a value.
 * @property {ValueFormat} [format] - Output format ("currency" or "compact"). Defaults to "compact".
 * @property {string} [locale] - BCP 47 locale string. Defaults to "en-US".
 * @property {string} [currencyCode] - Currency code (e.g., "USD"). Used only if format is "currency". Defaults to "USD".
 */
interface FormatValueOptions {
  format?: ValueFormat;
  locale?: string;
  currencyCode?: string; // Only used if format === "currency"
}

/**
 * Formats a numeric value as a currency or compact string, based on options.
 *
 * @param {number} value - The value to format.
 * @param {FormatValueOptions} [options] - Formatting options.
 * @returns {string} - The formatted value string.
 *
 * Example usage:
 *   formatValue(1200, { format: "currency" }) // "$1,200"
 *   formatValue(1200, { format: "compact" })  // "1.2K"
 */
export function formatValue(
  value: number,
  {
    format = "compact",
    locale = "en-US",
    currencyCode = "USD",
  }: FormatValueOptions = {}
): string {
  if (format === "currency") {
    return Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(value);
  }

  return Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
