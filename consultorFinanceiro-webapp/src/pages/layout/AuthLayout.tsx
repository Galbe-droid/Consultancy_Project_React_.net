import { Box } from "@mui/material";
import type {ReactNode} from "react";

type AuthLayoutProps = {
    children: ReactNode;
};

export default function AuthLayout({ children }:AuthLayoutProps) {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(135deg, #4f8cff, #22c55e)",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <h1>Consultantion App</h1>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#121212",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}