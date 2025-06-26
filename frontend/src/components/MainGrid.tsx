/**
 * MainGrid component
 *
 * Displays the main dashboard grid, including:
 *   - Date range selection (with reset to last 7 days)
 *   - Revenue and passenger (pax) bar charts
 *   - Error and warning notifications via notistack
 *
 * Data is fetched using React Query hooks and displayed in Material UI components.
 *
 * Features:
 *   - Uses a custom date range picker for filtering data
 *   - Shows loading and error states for each chart
 *   - Responsive layout for different screen sizes
 *
 * Example usage:
 *   <MainGrid />
 */
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { DateRangePicker } from "~/components/DateRangePicker";
import { MetricBarChart } from "~/components/MetricBarChart";

import { useMetricData } from "~/api/useMetricData";
import { MetricKey } from "~/api/types";
import { fetchPax, fetchRevenue } from "~/api/fetchers";
import { useValidDateRange } from "~/hooks/useValidDateRange";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export function MainGrid() {
  // Manage date range selection and validation
  const {
    from,
    to,
    error: dateError,
    onChange: handleDateChange,
    reset,
    shouldShowReset,
  } = useValidDateRange(dayjs().subtract(6, "day"), dayjs());

  const f = from.format("YYYY-MM-DD");
  const t = to.format("YYYY-MM-DD");

  // Fetch revenue data for the selected date range
  const {
    data: revenueData,
    isError: revenueError,
    isLoading: revenueLoading,
  } = useMetricData({
    key: MetricKey.Revenue,
    from: f,
    to: t,
    fetcher: fetchRevenue,
  });

  // Fetch passenger (pax) data for the selected date range
  const {
    data: paxData,
    isError: paxError,
    isLoading: paxLoading,
  } = useMetricData({
    key: MetricKey.Pax,
    from: f,
    to: t,
    fetcher: fetchPax,
  });

  const { enqueueSnackbar } = useSnackbar();

  // Show error/warning notifications
  useEffect(() => {
    if (dateError) {
      enqueueSnackbar(dateError, { variant: "warning" });
    }

    if (revenueError) {
      enqueueSnackbar("Failed to load revenue data", { variant: "error" });
    }

    if (paxError) {
      enqueueSnackbar("Failed to load passenger data", { variant: "error" });
    }
  }, [dateError, revenueError, paxError, enqueueSnackbar]);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
        sx={{ mb: 2 }}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography component="h2" variant="h6" sx={{ mb: { xs: 2, md: 0 } }}>
            Overview
          </Typography>

          {shouldShowReset && (
            <Button variant="outlined" size="small" onClick={reset}>
              Reset to last 7 days
            </Button>
          )}
        </Stack>

        <DateRangePicker from={from} to={to} onChange={handleDateChange} />
      </Stack>

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <MetricBarChart
            title="Total Revenue"
            data={revenueData}
            loading={revenueLoading}
            error={revenueError}
            color="#1976d2"
            valueFormat="currency"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <MetricBarChart
            title="Total Passengers"
            data={paxData}
            loading={paxLoading}
            error={paxError}
            color="#9c27b0"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
