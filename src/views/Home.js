import React from "react";
import SimpleSlider from "../components/Slider.js";
import CardSlider from "../components/CardSlider.js";
import Box from "@mui/material/Box";
import { images } from "../const/Const.js";
export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          maxWidth: "2000px",
        }}
      >
        <SimpleSlider></SimpleSlider>
        <CardSlider />
      </Box>
    </div>
  );
}
