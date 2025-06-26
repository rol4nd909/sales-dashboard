import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";

import { AppTheme } from "~/theme/AppTheme";
import { AppNavbar } from "~/components/layout/AppNavbar";
import { Header } from "~/components/layout/Header";
import { MainGrid } from "~/components/MainGrid";
import { SideMenu } from "~/components/navigation/SideMenu";

import { datePickersCustomizations } from "~/theme/customizations/datePickers";
import { chartsCustomizations } from "~/theme/customizations/charts";

const ThemeComponents = {
  ...chartsCustomizations,
  ...datePickersCustomizations,
};

export function Dashboard() {
  return (
    <AppTheme themeComponents={ThemeComponents}>
      <CssBaseline enableColorScheme />

      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />

        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />

            <MainGrid />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
