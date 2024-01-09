import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "../styles.css";

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
      } catch (error) {
        console.error("Error deleting house booking:", error);
      }
    };
  
    return (
      <div className="DeleteHouse">
        <h1>Booked Houses:</h1>
        {bookedHouses.map((house) => (
          <div key={house.id}>
            <h2>{house.name}</h2>
            <img src={house.imageUrl} alt={house.name} />
            <p>Description: {house.description}</p>
            <p>Address: {house.address}</p>
            <button onClick={() => handleDeleteHouse(house.id)}>Delete Booking</button>
          </div>
        ))}
      </div>
    );
  }
