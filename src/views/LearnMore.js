import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, updateDoc, arrayUnion,getDoc } from "firebase/firestore";
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
  const [selectedDates, setSelectedDates] = useState([]);
  const [user, setUser] = React.useState(
    () => JSON.parse(localStorage.getItem("user2")) || null
  );
  const db = getFirestore();

  useEffect(() => {
    async function fetchHouseDetails() {
      try {
        const houseDocRef = doc(db, `Houses/${id}`);
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

  const addDatesToBookedDates = async (start, end) => {
    const houseRef = doc(db, `Houses/${id}`);
    
    const datesToAdd = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      datesToAdd.push(currentDate.toISOString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    try {
      await updateDoc(houseRef, {
        bookedDates: arrayUnion(...datesToAdd),
      });
      console.log("Dates successfully added to bookedDates!");

      // Update user's document in the 'Users' collection
      console.log("asdasdasdas"+user.id);
      const userRef = doc(db, "Users", user.id); // Assuming 'email' is a unique identifier
      const userDocSnapshot = await getDoc(userRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const updatedUserData = {
          ...userData,
          bookedHouse: id,
          bookedDates: arrayUnion(...datesToAdd),
        };
        await updateDoc(userRef, updatedUserData);
        console.log("User's document updated with booked house and dates.");
      } else {
        console.log("User not found in database.");
      }
    } catch (error) {
      console.error("Error adding dates to bookedDates:", error);
    }
  };

  const isDateInRange = (date, start, end) => {
    return date >= start && date <= end;
  };

  const handleBookNowClick = async () => {
    try {
      const datesToAdd = selectedDates.map((date) =>
        new Date(date).toISOString()
      );

      if (datesToAdd.length === 2 && datesToAdd[0] !== datesToAdd[1]) {
        const [start, end] = datesToAdd.map((date) => new Date(date));
        console.log(user.id);
        const userRef = doc(db, "Users", user.id);
        const userDocSnapshot = await getDoc(userRef);
        const userData = userDocSnapshot.data();

        if (userData && userData.bookedHouse) {
          alert("You already have a booked house. You cannot book another one.");
          return;
        }

        const houseRef = doc(db, `Houses/${id}`);
        const houseDocSnapshot = await getDoc(houseRef);
        const houseData = houseDocSnapshot.data();

        if (houseData.bookedDates && houseData.bookedDates.length > 0) {
          const bookedDates = houseData.bookedDates;

          const isStartOrEndBooked = bookedDates.some((bookedDate) => {
            const date = new Date(bookedDate);
            return isDateInRange(date, start, end);
          });

          if (isStartOrEndBooked) {
            const [bookedStartDate, bookedEndDate] = bookedDates.map((date) => new Date(date));
            alert(`This house is booked between ${bookedStartDate.toDateString()} and ${bookedEndDate.toDateString()}`);
            return;
          }
        }

        await addDatesToBookedDates(start, end);
        alert("House successfully booked")
        console.log("House successfully booked!");
      } else {
        alert("Please select different start and end dates.")
        console.log("Please select different start and end dates.");
      }
    } catch (error) {
      console.error("Error booking house:", error);
    }
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
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
          <BasicDatePicker onDateChange={handleDateChange} />
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