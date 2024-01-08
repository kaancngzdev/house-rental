import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import SimpleSlider from "../components/Slider.js";
import Box from "@mui/material/Box";
import BasicDatePicker from "../components/DatePicker.js";

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

  return (
    <div>
       <Box display={"block"}>
      <Box>
        <SimpleSlider />
      </Box>
      <Box>
        <h2>Property Details </h2>
        <p>Property Type: Apartment</p>
        <p>Number of Rooms: 3</p>
        <p>Area: 150 sqm</p>
        <p>Price: $2000/month</p>
      </Box>
      <Box>
        <BasicDatePicker></BasicDatePicker>
      </Box>
    </Box>
      <h2>Property Details</h2>
      <p>Property Type: {houseDetails.propertyType}</p>
      <p>Number of Rooms: {houseDetails.numRooms}</p>
      <p>Area: {houseDetails.area} sqm</p>
      <p>Price: ${houseDetails.price}/month</p>
      <img src={houseDetails.imageUrl} alt="House" style={{ maxWidth: "100%" }} />
      {/* Include other house details you want to display */}
    </div>
  );
}



