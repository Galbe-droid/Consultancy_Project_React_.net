import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#4f8cff", 
    },
    secondary: {
      main: "#22c55e",
    },
    text: {
      primary: "#e5e7eb",
      secondary: "#9ca3af",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
  },
});