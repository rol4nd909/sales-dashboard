import { renderHook, act } from "@testing-library/react";
import dayjs from "dayjs";
import { useValidDateRange, MAX_RANGE_DAYS } from "./useValidDateRange";
import { describe, expect, it } from "vitest";

describe("useValidDateRange", () => {
  const today = dayjs();
  const sixDaysAgo = today.subtract(6, "day");

  it("should initialize correctly", () => {
    const { result } = renderHook(() => useValidDateRange(sixDaysAgo, today));
    expect(result.current.from).toEqual(sixDaysAgo);
    expect(result.current.to).toEqual(today);
    expect(result.current.error).toBeNull();
  });

  it("should reject if end date is before start date", () => {
    const { result } = renderHook(() => useValidDateRange(today, today));

    act(() => {
      result.current.onChange(today, today.subtract(1, "day"));
    });

    expect(result.current.error).toBe("End date cannot be before start date.");
  });

  it("should reject if range exceeds max days", () => {
    const { result } = renderHook(() => useValidDateRange(sixDaysAgo, today));

    const tooFar = today.add(MAX_RANGE_DAYS + 1, "day");

    act(() => {
      result.current.onChange(sixDaysAgo, tooFar);
    });

    expect(result.current.error).toMatch(/cannot exceed/);
  });

  it("should accept a valid new range", () => {
    const { result } = renderHook(() => useValidDateRange(sixDaysAgo, today));

    const from = today.subtract(5, "day");
    const to = today;

    act(() => {
      result.current.onChange(from, to);
    });

    expect(result.current.from).toEqual(from);
    expect(result.current.to).toEqual(to);
    expect(result.current.error).toBeNull();
  });
});
