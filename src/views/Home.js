import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Box from "@mui/material/Box";
import SimpleSlider from "../components/Slider";
import CardSlider from "../components/CardSlider";
import MediaCard from "../components/Card";

const Home = () => {
  const [popularHouses, setPopularHouses] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    async function fetchPopularHouses() {
      try {
        const popularHousesCollection = collection(db, "PopularHouses"); // Update with the correct collection name
        const popularHousesSnapshot = await getDocs(popularHousesCollection);
        const popularHousesData = popularHousesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPopularHouses(popularHousesData);
      } catch (error) {
        console.error("Error fetching popular houses:", error);
      }
    }

    fetchPopularHouses();
  }, [db]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          maxWidth: "1000px",
        }}
      >
        <div style={{ marginBottom: "5rem" }}>
          <SimpleSlider></SimpleSlider>
        </div>
        <div>
          <h1>Most Popular Houses</h1>
        </div>
        <div>
          <CardSlider cards={popularHouses} />
        </div>
      </Box>
    </div>
  );
};

export default Home;
