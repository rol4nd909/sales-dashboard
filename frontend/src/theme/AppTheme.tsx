/**
 * AppTheme component
 *
 * Provides a custom Material UI theme to all child components using ThemeProvider.
 *
 * Features:
 *   - Combines color schemes, typography, shadows, and shape from theme primitives
 *   - Merges custom component overrides for inputs, data display, feedback, navigation, and surfaces
 *   - Supports additional theme component overrides via the themeComponents prop
 *   - Configures CSS variables for color scheme and prefix
 *
 * @param {AppThemeProps} props - Props for the AppTheme component
 * @param {ReactNode} props.children - Child components to be wrapped with the theme
 * @param {ThemeOptions["components"]} [props.themeComponents] - Optional additional component overrides
 *
 * Example usage:
 *   <AppTheme>
 *     <App />
 *   </AppTheme>
 */
import type { ReactNode } from "react";
import {
  ThemeProvider,
  createTheme,
  type ThemeOptions,
} from "@mui/material/styles";
import { colorSchemes, shadows, shape, typography } from "./themePrimitives";
import { inputsCustomizations } from "./customizations/inputs";
import { dataDisplayCustomizations } from "./customizations/dataDisplay";
import { feedbackCustomizations } from "./customizations/feedback";
import { navigationCustomizations } from "./customizations/navigation";
import { surfacesCustomizations } from "./customizations/surfaces";

/**
 * Props for AppTheme component.
 */
interface AppThemeProps {
  children: ReactNode;
  themeComponents?: ThemeOptions["components"];
}

export function AppTheme(props: AppThemeProps) {
  const { children, themeComponents } = props;
  const theme = createTheme({
    // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
    cssVariables: {
      colorSchemeSelector: "data-mui-color-scheme",
      cssVarPrefix: "template",
    },
    colorSchemes,
    typography,
    shadows,
    shape,
    components: {
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...feedbackCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
      ...themeComponents,
    },
  });

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
