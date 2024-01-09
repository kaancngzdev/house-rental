// Houses.js
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import MediaCard from "../components/Card";

import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import NestedList from "../components/Filter.js";

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

export default function Houses() {
  const [houses, setHouses] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
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
        setFilteredProperties(housesData);
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    }

    fetchHouses();
  }, [db]);

  const handleLearnMore = (id) => {
    navigate(`/houses/${id}`);
  };

  const handleAddFavorite = async (id) => {
    try {
      const houseRef = doc(db, "Houses", id);
      const userData = JSON.parse(localStorage.getItem("user"));
      const userEmail = userData.email;

      const houseDoc = await getDoc(houseRef);
      const houseData = houseDoc.data();

      // Get the current favorites or initialize an empty array
      const currentFavorites = houseData.favorites || [];

      // Add the user's email to the favorites array if it doesn't exist
      if (!currentFavorites.includes(userEmail)) {
        currentFavorites.push(userEmail);
        await setDoc(houseRef, { favorites: currentFavorites });
        console.log(`House ${id} added to favorites for user ${userEmail}`);
      } else {
        console.log(
          `House ${id} is already in favorites for user ${userEmail}`
        );
      }
    } catch (error) {
      console.error("Error adding house to favorites:", error);
    }
  };

  return (
    <div className="Houses">
      <NestedList setFilteredProperties={setFilteredProperties} db={db} />
      {filteredProperties.map((house) => (
        <MediaCard
          key={house.id}
          description={house.description}
          propertyType={house.propertyType}
          numberOfRooms={house.numRooms}
          squaremeters={house.squaremeters}
          price={house.price}
          image={house.imageUrl}
          id={house.id}
          onAddFavorite={(id) => handleAddFavorite(id)}
          onLearnMore={() => handleLearnMore(house.id)}
        ></MediaCard>
      ))}
    </div>
  );
}
