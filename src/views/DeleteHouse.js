import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import "../styles.css";

// Replace these values with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDr5IP84sJViNSI_XLit44MoCECUq2seko",
    authDomain: "houserent-5579d.firebaseapp.com",
    projectId: "houserent-5579d",
    storageBucket: "houserent-5579d.appspot.com",
    messagingSenderId: "1083217632660",
    appId: "1:1083217632660:web:ea27e18e37fab3bf07c381",
    measurementId: "G-SRNE2DQ6CZ",
};

const firebaseApp = initializeApp(firebaseConfig);

export default function DeleteHouse() {
  const [houses, setHouses] = useState([]);
  const db = getFirestore(firebaseApp);

  const fetchHouses = async () => {
    try {
      const housesRef = collection(db, "Houses");
      const housesSnapshot = await getDocs(housesRef);

      const housesData = [];
      housesSnapshot.forEach((doc) => {
        housesData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setHouses(housesData);
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, [db]);

  const handleDeleteHouse = async (houseId) => {
    try {
      const houseRef = doc(db, "Houses", houseId);
      await deleteDoc(houseRef);

      const updatedHouses = houses.filter((house) => house.id !== houseId);
      setHouses(updatedHouses);
      alert("House deleted successfully!");
    } catch (error) {
      console.error("Error deleting house:", error);
    }
  };

  return (
    <div className="DeleteHouse">
      <h1>Houses:</h1>
      {houses.map((house) => (
        <Card key={house.id} sx={{ maxWidth: 400, marginBottom: 2 }}>
          <img src={house.imageUrl} alt={house.name} style={{ maxWidth: "100%", height: 200, objectFit: "cover" }} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {house.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {house.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: {house.address}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="error" onClick={() => handleDeleteHouse(house.id)}>
              Delete House
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}