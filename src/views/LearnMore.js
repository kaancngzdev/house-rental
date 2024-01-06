import React from "react";
import SimpleSlider from "../components/Slider.js";
import Box from "@mui/material/Box";
import BasicDatePicker from "../components/DatePicker.js";
export default function LearnMore() {
  return (
    <Box display={"block"}>
      <Box>
        <SimpleSlider />
      </Box>
      <Box>
        <h2>Property Details</h2>
        <p>Property Type: Apartment</p>
        <p>Number of Rooms: 3</p>
        <p>Area: 150 sqm</p>
        <p>Price: $2000/month</p>
      </Box>
      <Box>
        <BasicDatePicker></BasicDatePicker>
      </Box>
    </Box>
  );
}
