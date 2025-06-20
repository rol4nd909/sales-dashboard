import { describe, expect, test } from "vitest";
import { formatValue } from "./formatValue";

describe("formatValue", () => {
  test("formats value in compact notation by default", () => {
    expect(formatValue(1234)).toBe("1.2K");
  });

  test("formats value in compact notation (en-US)", () => {
    expect(formatValue(1234, { format: "compact", locale: "en-US" })).toBe(
      "1.2K"
    );
  });

  test("formats value as currency (EUR)", () => {
    expect(
      formatValue(1000, { format: "currency", currencyCode: "EUR" })
    ).toMatch(/€\s?1.000|1.000\s?€/);
  });

  test("formats value as currency (USD)", () => {
    expect(
      formatValue(1000, {
        format: "currency",
        currencyCode: "USD",
        locale: "en-US",
      })
    ).toBe("$1,000");
  });

  test("formats value as currency (GBP, en-GB)", () => {
    expect(
      formatValue(2500, {
        format: "currency",
        currencyCode: "GBP",
        locale: "en-GB",
      })
    ).toBe("£2,500");
  });
});
