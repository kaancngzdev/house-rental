import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr5IP84sJViNSI_XLit44MoCECUq2seko",
  authDomain: "houserent-5579d.firebaseapp.com",
  projectId: "houserent-5579d",
  storageBucket: "houserent-5579d.appspot.com",
  messagingSenderId: "1083217632660",
  appId: "1:1083217632660:web:ea27e18e37fab3bf07c381",
  measurementId: "G-SRNE2DQ6CZ"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

export default function Houses() {
  const [houses, setHouses] = useState([]);
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHouses() {
      try {
        const housesCollection = collection(db, "Houses");
        const housesSnapshot = await getDocs(housesCollection);
        const housesData = housesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHouses(housesData);
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    }

    fetchHouses();
  }, [db]);

  const handleLearnMore = (id) => {
    // Handle navigation to individual house details using the house id
    navigate(`/houses/${id}`);
  };

  const handleAddFavorite = (id) => {
    // Logic to add the house with the given id to favorites
    console.log(`Added house ${id} to favorites`);
  };

  return (
    <div className="Houses">
      {houses.map((house) => (
        <Card key={house.id} sx={{ maxWidth: 345, margin: 10 }}>
          <CardMedia
            component="img"
            height="140"
            image={house.imageUrl} 
            alt={house.propertyType} 
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {house.propertyType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Number of Rooms: {house.numRooms}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Area: {house.area} m²
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {house.price} TL
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleLearnMore(house.id)}>
              Learn More
            </Button>
            <Button size="small" onClick={() => handleAddFavorite(house.id)}>
              Add Favorite
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
