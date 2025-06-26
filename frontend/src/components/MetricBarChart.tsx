/**
 * MetricBarChart component
 *
 * Displays a bar chart for a given metric (e.g., revenue or passengers) with total, percentage difference,
 * and error/loading states. Uses Material UI and MUI X BarChart for visualization.
 *
 * Props:
 *   - title: string — Chart title
 *   - data: MetricItem[] | undefined — Array of metric data points
 *   - loading?: boolean — Show loading skeleton if true
 *   - error?: boolean — Show error alert if true
 *   - color?: string — Bar color (defaults to theme primary)
 *   - valueFormat?: "compact" | "currency" — Value formatting style
 *
 * Features:
 *   - Shows total value and percentage difference from previous period
 *   - Responsive and styled with Material UI
 *   - Handles loading and error states gracefully
 *
 * Example usage:
 *   <MetricBarChart title="Total Revenue" data={data} loading={loading} error={error} />
 */
import { useMemo } from "react";

import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";

import type { MetricItem } from "~/api/types";

import { formatValue } from "~/utils/formatValue";

/**
 * Props for MetricBarChart component.
 */
interface Props {
  title: string;
  data: MetricItem[] | undefined;
  loading?: boolean;
  error?: boolean;
  color?: string;
  valueFormat?: "compact" | "currency";
}

export function MetricBarChart({
  title,
  data,
  loading,
  error,
  color,
  valueFormat,
}: Props) {
  const theme = useTheme();

  const colors = [color || theme.palette.primary.main];

  // Generate x-axis labels in the format 'Mon DD' (e.g., 'Jun 19') from metric timestamps
  const xAxisLabels = useMemo(
    () =>
      data?.map((d) =>
        new Date(d.timestamp).toLocaleDateString("en-EN", {
          month: "short",
          day: "2-digit",
        })
      ) ?? [],
    [data]
  );

  // Extract metric values from the data array
  const values = data?.map((d) => d.value) ?? [];

  // Calculate the total sum of all metric values
  const total = values.reduce((sum, v) => sum + v, 0);

  // Calculate the sum of all values except the last (previous period)
  const previous = values.slice(0, -1);
  const previousTotal =
    previous.length > 0 ? previous.reduce((sum, v) => sum + v, 0) : total;

  // Calculate the percentage difference between current and previous totals
  const percentDiff = previousTotal
    ? ((total - previousTotal) / previousTotal) * 100
    : 0;

  // Determine the color for the difference chip based on the sign of percentDiff
  const diffColor =
    percentDiff > 0 ? "success" : percentDiff < 0 ? "error" : "default";

  // Format the percentage difference label (e.g., '+5.2%')
  const diffLabel =
    percentDiff === 0
      ? "0%"
      : `${percentDiff > 0 ? "+" : ""}${percentDiff.toFixed(1)}%`;

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>

        <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
          <Typography variant="h4" component="p">
            {formatValue(total, {
              format: valueFormat,
            })}
          </Typography>
          <Chip size="small" color={diffColor} label={diffLabel} />
        </Stack>

        {error && <Alert severity="error">Failed to load data</Alert>}
        {loading && <Skeleton variant="rectangular" height={250} />}

        {!loading && !error && values.length > 0 && (
          <BarChart
            dataset={data}
            colors={colors}
            xAxis={[{ data: xAxisLabels }]}
            yAxis={[
              {
                width: 60,
                valueFormatter: (value: number | null) =>
                  formatValue(value ?? 0, {
                    format: valueFormat,
                  }),
              },
            ]}
            series={[
              {
                dataKey: "value",
                label: title,
                valueFormatter: (value) =>
                  formatValue(value ?? 0, {
                    format: valueFormat,
                  }),
              },
            ]}
            height={360}
            margin={0}
            grid={{ horizontal: true }}
            borderRadius={8}
            hideLegend
          />
        )}
      </CardContent>
    </Card>
  );
}
