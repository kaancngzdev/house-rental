import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Box from "@mui/material/Box";
import BasicDatePicker from "../components/DatePicker.js";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function LearnMore() {
  const { id } = useParams();
  const [houseDetails, setHouseDetails] = useState({});
  const db = getFirestore();

  useEffect(() => {
    async function fetchHouseDetails() {
      try {
        const houseDocRef = doc(db, "Houses", id);
        const houseDocSnapshot = await getDoc(houseDocRef);
        if (houseDocSnapshot.exists()) {
          setHouseDetails(houseDocSnapshot.data());
        } else {
          console.log("House not found");
        }
      } catch (error) {
        console.error("Error fetching house details:", error);
      }
    }

    fetchHouseDetails();
  }, [db, id]);

  const handleBookNowClick = () => {
    // Add logic for booking the property
    console.log("Book Now clicked!");
    // You can navigate to a booking page or implement your booking logic here
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box display={"flex"} justifyContent={"space-between"}>
          <img
            src={houseDetails.imageUrl}
            alt="House"
            style={{
              maxWidth: "60%",
            }}
          />
          <div
            style={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2>Property Details</h2>
            <p>Property Type: {houseDetails.propertyType}</p>
            <p>Number of Rooms: {houseDetails.numRooms}</p>
            <p>Area: {houseDetails.area} sqm</p>
            <p>Price: ${houseDetails.price}/day</p>
            <p>Description: {houseDetails.description}</p>
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            marginTop: "10px",
          }}
        >
          <BasicDatePicker />
          <Button
            variant="contained"
            color="primary"
            onClick={handleBookNowClick}
            sx={{ marginLeft: "10px" }}
          >
            Book Now
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  );
}
