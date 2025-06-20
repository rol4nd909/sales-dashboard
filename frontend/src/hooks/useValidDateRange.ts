/**
 * useValidDateRange hook
 *
 * Manages a date range selection with validation logic for dashboards and reports.
 *
 * Features:
 *   - Ensures the end date is not before the start date
 *   - Limits the date range to a maximum number of days (MAX_RANGE_DAYS)
 *   - Provides error messages for invalid selections
 *   - Supports resetting to the default last 7 days range
 *
 * @param {Dayjs} initialFrom - Initial start date
 * @param {Dayjs} initialTo - Initial end date
 * @returns {object} - Contains date values, error, setters, change handler, reset, and reset visibility flag
 *
 * Example usage:
 *   const { from, to, error, onChange, reset, shouldShowReset } = useValidDateRange(dayjs().subtract(6, 'day'), dayjs());
 */
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

/**
 * Maximum allowed range in days for the date picker.
 */
export const MAX_RANGE_DAYS = 60;

export function useValidDateRange(initialFrom: Dayjs, initialTo: Dayjs) {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [error, setError] = useState<string | null>(null);

  const today = dayjs();
  const last7 = today.subtract(6, "day");
  const isDefaultRange = from.isSame(last7, "day") && to.isSame(today, "day");

  /**
   * Handles changes to the date range, validating order and range length.
   * @param {Dayjs} newFrom - New start date
   * @param {Dayjs} newTo - New end date
   */
  const handleChange = (newFrom: Dayjs, newTo: Dayjs) => {
    if (newTo.isBefore(newFrom)) {
      setError("End date cannot be before start date.");
      return;
    }

    const diff = newTo.diff(newFrom, "day");
    if (diff > MAX_RANGE_DAYS) {
      setError(`Date range cannot exceed ${MAX_RANGE_DAYS} days.`);
      return;
    }

    setError(null);
    setFrom(newFrom);
    setTo(newTo);
  };

  /**
   * Resets the date range to the last 7 days.
   */
  const reset = () => {
    const now = dayjs();
    const past = now.subtract(6, "day");
    setFrom(past);
    setTo(now);
    setError(null);
  };

  return {
    from,
    to,
    error,
    setFrom,
    setTo,
    onChange: handleChange,
    reset,
    shouldShowReset: !isDefaultRange,
  };
}
