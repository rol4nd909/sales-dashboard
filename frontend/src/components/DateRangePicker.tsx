/**
 * DateRangePicker component for selecting a date range using two MUI DatePickers.
 *
 * - Uses Dayjs for date management.
 * - Custom button field for a compact, icon-based date picker trigger.
 * - Disables selection of future dates.
 *
 * Props:
 *   - from: Dayjs (start date)
 *   - to: Dayjs (end date)
 *   - onChange: (from: Dayjs, to: Dayjs) => void (callback when either date changes)
 *
 * Example usage:
 *   <DateRangePicker from={from} to={to} onChange={handleChange} />
 */
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForkRef } from "@mui/material/utils";
import {
  useParsedFormat,
  usePickerContext,
  useSplitFieldProps,
  type DatePickerFieldProps,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Maximum selectable date is today
const MAX_DATE = dayjs();

/**
 * Custom field component for DatePicker that renders a button with a calendar icon.
 *
 * @param {DatePickerFieldProps} props - Props passed from the DatePicker.
 * @returns {JSX.Element}
 */
type ButtonFieldProps = DatePickerFieldProps;

function ButtonField(props: ButtonFieldProps) {
  const { forwardedProps } = useSplitFieldProps(props, "date");
  const pickerContext = usePickerContext();
  const handleRef = useForkRef(pickerContext.triggerRef, pickerContext.rootRef);
  const parsedFormat = useParsedFormat();
  const valueStr =
    pickerContext.value == null
      ? parsedFormat
      : pickerContext.value.format(pickerContext.fieldFormat);

  return (
    <Button
      {...forwardedProps}
      variant="outlined"
      ref={handleRef}
      size="small"
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: "fit-content", textTransform: "none" }}
      onClick={() => pickerContext.setOpen((prev) => !prev)}
    >
      {pickerContext.label ?? valueStr}
    </Button>
  );
}

/**
 * Props for DateRangePicker component.
 * @property {Dayjs} from - Start date.
 * @property {Dayjs} to - End date.
 * @property {(from: Dayjs, to: Dayjs) => void} onChange - Callback when either date changes.
 */
interface DateRangePickerProps {
  from: Dayjs;
  to: Dayjs;
  onChange: (from: Dayjs, to: Dayjs) => void;
}

export function DateRangePicker({ from, to, onChange }: DateRangePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={{ xs: 2, sm: 4 }}
        alignItems="center"
        sx={{
          ml: { md: "auto" },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={{ sm: 2 }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            from
          </Typography>
          <DatePicker
            label={from.format("MMM DD, YYYY")}
            value={from}
            onChange={(newValue) => {
              if (newValue) onChange(newValue, to);
            }}
            slots={{ field: ButtonField }}
            maxDate={MAX_DATE}
          />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={{ sm: 2 }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            to
          </Typography>
          <DatePicker
            label={to.format("MMM DD, YYYY")}
            value={to}
            onChange={(newValue) => {
              if (newValue) onChange(from, newValue);
            }}
            slots={{ field: ButtonField }}
            maxDate={MAX_DATE}
          />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
}
