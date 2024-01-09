import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { addHouseToFirestore } from "../back-end/addHouseFB";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import  { useState, useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50",
    },
  },
});

export default function BasicTextFields() {
  const [propertyType, setPropertyType] = useState("");
  const [numRooms, setNumRooms] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [houses, setHouses] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    async function fetchHouses() {
      const housesCollection = collection(db, "Houses");
      const housesSnapshot = await getDocs(housesCollection);
      const housesData = housesSnapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID as 'id' in the data
        ...doc.data(),
      }));
      setHouses(housesData);
      
    }

    fetchHouses();
  }, [db]);

  const [errorText, setErrorText] = React.useState({
    imageLink: "",
    propertyType: "",
    numOfRooms: "",
    area: "",
    price: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const houseData = {
      propertyType,
      numRooms,
      area,
      price,
      description,
      imageUrl,
      dates: [],
    };

    try {
      const response = await addHouseToFirestore(houseData);
      console.log(response);

      // Fetch and update houses after adding a new house
      const housesCollection = collection(db, "Houses");
      const housesSnapshot = await getDocs(housesCollection);
      const housesData = housesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHouses(housesData);

      setPropertyType("");
      setNumRooms("");
      setArea("");
      setPrice("");
      setDescription("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding house to Firestore:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          textAlign: "center",
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4" gutterBottom>
          Add House
        </Typography>
        <TextField
  id="standard-basic-imageLink"
  label="Image Link"
  variant="standard"
  error={Boolean(errorText.imageLink)}
  helperText={errorText.imageLink}
  value={imageUrl}
  onChange={(e) => setImageUrl(e.target.value)}
/>

<TextField
  id="standard-basic-propertyType"
  label="Property Type"
  variant="standard"
  error={Boolean(errorText.propertyType)}
  helperText={errorText.propertyType}
  value={propertyType}
  onChange={(e) => setPropertyType(e.target.value)}
/>

<TextField
  id="standard-basic-numOfRooms"
  label="Number Of Rooms"
  variant="standard"
  error={Boolean(errorText.numOfRooms)}
  helperText={errorText.numOfRooms}
  value={numRooms}
  onChange={(e) => setNumRooms(e.target.value)}
/>

<TextField
  id="standard-basic-area"
  label="Area"
  variant="standard"
  error={Boolean(errorText.area)}
  helperText={errorText.area}
  value={area}
  onChange={(e) => setArea(e.target.value)}
/>

<TextField
  id="standard-basic-price"
  label="Price"
  variant="standard"
  error={Boolean(errorText.price)}
  helperText={errorText.price}
  value={price}
  onChange={(e) => setPrice(e.target.value)}
/>

<TextField
  id="standard-basic-description"
  label="Description"
  variant="standard"
  error={Boolean(errorText.description)}
  helperText={errorText.description}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
        <Button
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Box>
    </ThemeProvider>
  );
}
