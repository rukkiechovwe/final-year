import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

export default function ThemeConfig({ children }) {
  const themeOptions = {
    palette: {
      primary: {
        main: "#91019a",
      },
      secondary: {
        light: "#0066ff",
        main: "#0044ff",
        contrastText: "#ffcc00",
      },
      custom: {
        light: "#ffa726",
        main: "#f57c00",
        dark: "#ef6c00",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    typography: {
      htmlFontSize: 16,
      fontFamily: "'Public Sans', sans-serif",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
      h1: {
        fontWeight: 600,
        fontSize: "2.375rem",
        lineHeight: 1.21,
      },
      h2: {
        fontWeight: 600,
        fontSize: "1.875rem",
        lineHeight: 1.27,
      },
      h3: {
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: 1.33,
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.25rem",
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 600,
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      h6: {
        fontWeight: 400,
        fontSize: "0.875rem",
        lineHeight: 1.57,
      },
      caption: {
        fontWeight: 400,
        fontSize: "0.75rem",
        lineHeight: 1.66,
      },
      body1: {
        fontSize: "0.875rem",
        lineHeight: 1.57,
      },
      body2: {
        fontSize: "0.75rem",
        lineHeight: 1.66,
      },
      subtitle1: {
        fontSize: "0.875rem",
        fontWeight: 600,
        lineHeight: 1.57,
      },
      subtitle2: {
        fontSize: "0.75rem",
        fontWeight: 500,
        lineHeight: 1.66,
      },
      overline: {
        lineHeight: 1.66,
      },
      button: {
        textTransform: "capitalize",
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: { border: "1px solid #d0d0d08f", boxShadow: "none" },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: { borderBottom: "1px solid #d0d0d08f" },
        },
      },
    },
  };

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
