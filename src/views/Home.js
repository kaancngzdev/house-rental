import React from "react";
import SimpleSlider from "../components/Slider.js";
import CardSlider from "../components/CardSlider.js";
import Box from "@mui/material/Box";
export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          maxWidth: "2000px",
        }}
      >
        <div style={{ marginBottom: "5rem" }}>
          <SimpleSlider></SimpleSlider>
        </div>
        <div style={{}}>
          <h1>Most Popular Houses</h1>
        </div>
        <div>
          <CardSlider />
        </div>
      </Box>
    </div>
  );
}
