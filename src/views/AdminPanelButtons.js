import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

export default function AdminPanelButtons() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "10rem",
      }}
    >
      <Button
        onClick={() => navigate("/adminpanel")}
        variant="contained"
        color="primary"
        sx={{ color: "white", backgroundColor: "green" }}
      >
        Add House
      </Button>

      <Button
        onClick={() => navigate("/deletehouse")}
        variant="contained"
        color="primary"
        sx={{ color: "white", backgroundColor: "green" }}
      >
        Delete House
      </Button>
      <Button
        onClick={() => navigate("/deletebooking")}
        variant="contained"
        color="primary"
        sx={{ color: "white", backgroundColor: "green" }}
      >
        Delete Booking
      </Button>
    </Box>
  );
}
