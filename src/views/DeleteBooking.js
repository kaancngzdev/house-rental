import React, { useState, useEffect } from "react";

import "../styles.css";

import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  query, where
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

import "../styles.css";
import AdminMediaCard from "../components/AdminCart";

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

export default function DeleteBooking() {
  const [bookedHouses, setBookedHouses] = useState([]);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user2")) || null);
  const db = getFirestore(firebaseApp);

  const fetchBookedHouses = async () => {
    try {
      const housesRef = collection(db, "Houses");
      const housesSnapshot = await getDocs(housesRef);

      const housesWithBookings = [];
      housesSnapshot.forEach((doc) => {
        const houseData = doc.data();
        if (houseData.bookedDates && houseData.bookedDates.length > 0) {
          housesWithBookings.push({
            id: doc.id,
            ...houseData,
          });
        }
      });

      setBookedHouses(housesWithBookings);
    } catch (error) {
      console.error("Error fetching booked houses:", error);
    }
  };

  useEffect(() => {
    fetchBookedHouses();
  }, [db]);

  const handleDeleteHouse = async (houseId) => {
    try {
      const houseRef = doc(db, "Houses", houseId);
      await setDoc(houseRef, { bookedDates: [] }, { merge: true });

      const updatedHouses = bookedHouses.filter((house) => house.id !== houseId);
      setBookedHouses(updatedHouses);
      alert("House booking deleted successfully!");

      // Find user with bookedHouse as the houseId
      const usersRef = collection(db, "Users");
      const usersSnapshot = await getDocs(query(usersRef, where("bookedHouse", "==", houseId)));

      usersSnapshot.forEach(async (userDoc) => {
        try {
          const userData = userDoc.data();
          const userRef = doc(db, "Users", userDoc.id);

          const filteredBookedDates = userData.bookedDates.filter((date) => date !== houseId);
          await setDoc(userRef, {
            bookedDates: [],
            bookedHouse: null,
          }, { merge: true });

          console.log("User booking details deleted successfully!");
        } catch (error) {
          console.error("Error deleting user booking details:", error);
        }
      });
    } catch (error) {
      console.error("Error deleting house booking:", error);
    }
  };

  return (
    <div
      className="DeleteHouse"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minWidth: "700px",
      }}
    >
      <h1>Booked Houses:</h1>
      {bookedHouses.map((house) => (
        <AdminMediaCard
          key={house.id}
          description={house.name}
          propertyType={house.propertyType}
          numberOfRooms={house.numRooms}
          squareMeters={house.area}
          price={house.price}
          image={house.imageUrl}
          title={house.name}
          id={house.id}
          customStyle={{ marginBottom: "20px" }}
          onDeleteBooking={handleDeleteHouse}
        />
      ))}
    </div>
  );
}