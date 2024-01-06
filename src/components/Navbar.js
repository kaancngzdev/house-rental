import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "green" }}>
        <Toolbar>
          <img
            src={Logo}
            alt="Logo"
            style={{ height: 40, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />

          <div>
            <Button
              variant="h6"
              component="div"
              sx={{}}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              variant="h6"
              component="div"
              sx={{}}
              onClick={() => navigate("/houses")}
            >
              Houses
            </Button>
            <Button
              variant="h6"
              component="div"
              sx={{}}
              onClick={() => navigate("/aboutus")}
            >
              About Us
            </Button>
          </div>
          <Box sx={{ marginLeft: "auto" }}>
            <Button color="inherit" onClick={() => navigate("/signin")}>
              Sign In
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
