import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#555555",
    },
    customBlue: {
      dark: "rgb(30, 58, 138)",
      main: "rgb(37, 99, 235)",
      light: "rgb(59, 130, 246)",
      extraLight: "#e3f2fd",
    },
  },
  typography: {
    fontFamily: "'Rubik', 'Arial', sans-serif",
    h5: {
      color: "rgb(30, 58, 138)",
      textAlign: "center",
      fontWeight: "bold",
    },
    body1: {
      lineHeight: 1.6,
    },
  },
});

export default theme;
