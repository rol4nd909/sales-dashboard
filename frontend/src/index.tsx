import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyledEngineProvider } from "@mui/material/styles";

import { Dashboard } from "~/pages/Dashboard";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={4000}
        >
          <Dashboard />
        </SnackbarProvider>
      </QueryClientProvider>
    </StyledEngineProvider>
  </StrictMode>
);
