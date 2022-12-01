import * as React from "react";
import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

import Logo from "../components/logo";
import AuthBackground from "../assets/images/auth/AuthBackground";
import AuthCard from "../components/authCard";

function AuthLayout({ children }) {
  return (
    <Box sx={{ minHeight: "100vh" }} className="testing-layout">
      <AuthBackground />
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{
          minHeight: "100vh",
        }}
      >
        <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: {
                xs: "calc(100vh - 134px)",
                md: "calc(100vh - 112px)",
              },
            }}
          >
            <Grid
              item
              sx={{
                maxWidth: "450px",
                background: " #fff",
                backgroundColor: "rgb(255, 255, 255)",
                color: "rgb(38, 38, 38)",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                overflow: "hidden",
                border: "none rgb(230, 235, 241)",
                borderRadius: "8px",
                boxShadow: "rgb(0 0 0 / 15%) 0px 2px 8px",
                margin: "0 auto",
              }}
            >
              <AuthCard>
                {/* {children} */}
                <Outlet />
              </AuthCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AuthLayout;
