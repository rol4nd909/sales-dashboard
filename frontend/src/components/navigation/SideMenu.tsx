import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { drawerClasses } from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

import { MenuContent } from "./MenuContent";
import { OptionsMenu } from "./OptionsMenu";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuContent />
      </Box>

      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt="Roland Franke"
          src="/static/images/avatar/avatar.jpg"
          sx={{ width: 36, height: 36 }}
        />

        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            Roland Franke
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            roland@sqills.com
          </Typography>
        </Box>

        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
