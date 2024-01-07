import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

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
            {isLoggedIn && (
              <Button color="inherit" onClick={() => navigate("/signup")}>
                deneme
              </Button>
            )}
          </Box>
          <Stack direction="row" spacing={2}>
            <div>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                sx={{ color: "white" }}
              >
                User
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem>Profile</MenuItem>
                          <MenuItem
                            onClick={(event) => {
                              navigate("/adminpanel");
                              handleClose(event);
                            }}
                          >
                            Admin Panel
                          </MenuItem>
                          <MenuItem onClick={handleClose}>Sign Out</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
