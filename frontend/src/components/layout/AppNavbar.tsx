import { useState } from "react";
import { AppBar, Stack, styled, tabsClasses, Typography } from "@mui/material";
import MuiToolbar from "@mui/material/Toolbar";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import { ColorModeIconDropdown } from "~/theme/ColorModeIconDropdown";
import { MenuButton } from "~/components/navigation/MenuButton";
import { SideMenuMobile } from "~/components/navigation/SideMenuMobile";

const Toolbar = styled(MuiToolbar)({
  width: "100%",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  gap: "12px",
  flexShrink: 0,
  [`& ${tabsClasses.list}`]: {
    gap: "8px",
    p: "8px",
    pb: 0,
  },
});

export function AppNavbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: "auto", md: "none" },
        boxShadow: 0,
        bgcolor: "background.paper",
        backgroundImage: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        top: 0,
      }}
    >
      <Toolbar variant="regular">
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            flexGrow: 1,
            width: "100%",
            gap: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "center", mr: "auto" }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: "text.primary" }}
            >
              Sales Dashboard
            </Typography>
          </Stack>

          <ColorModeIconDropdown />

          <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuRoundedIcon />
          </MenuButton>

          <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
