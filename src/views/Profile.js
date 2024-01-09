import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import MediaCard from "../components/Card";
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

export default function Profile() {
    const [bookedHouses, setBookedHouses] = useState([]);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user2")) || null);
    const db = getFirestore(firebaseApp);
    const navigate = useNavigate();
  
    const fetchBookedHouses = async () => {
      try {
        if (!user || !user.id) return;
  
        const userRef = doc(db, "Users", user.id);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
  
        if (userData && userData.bookedHouse) {
          const houseRef = doc(db, "Houses", userData.bookedHouse);
          const houseDoc = await getDoc(houseRef);
          const houseData = houseDoc.data();
  
          if (houseData) {
            const bookedHouse = {
              id: houseDoc.id,
              ...houseData,
              bookedDates: userData.bookedDates || [],
            };
  
            setBookedHouses([bookedHouse]);
          }
        }
      } catch (error) {
        console.error("Error fetching booked houses:", error);
      }
    };
  
    useEffect(() => {
      fetchBookedHouses();
    }, [db, user]);
  
    const handleDeleteBooking = async () => {
        try {
          if (!user || !user.id) return;
      
          const userRef = doc(db, "Users", user.id);
          const userDoc = await getDoc(userRef);
      
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const bookedHouseId = userData.bookedHouse;
            console.log("bookedHouseId:", bookedHouseId); // Check the value of bookedHouseId
      
            if (bookedHouseId) {
              const houseRef = doc(db, "Houses", bookedHouseId);
              const houseDoc = await getDoc(houseRef);
      
              if (houseDoc.exists()) {
                const houseData = houseDoc.data();
                const updatedBookedDates = houseData.bookedDates.filter((date) => !userData.bookedDates.includes(date));
      
                await setDoc(houseRef, { bookedDates: updatedBookedDates }, { merge: true });
                await setDoc(userRef, { bookedHouse: null, bookedDates: [] }, { merge: true });
      
                setUser({ ...user, bookedHouse: null, bookedDates: [] });
                setBookedHouses([]);
                alert("Booking deleted successfully!");
              } else {
                console.log("House document does not exist!");
              }
            } else {
              console.log("No booked house found for the user!");
            }
          } else {
            console.log("User document does not exist!");
          }
        } catch (error) {
          console.error("Error deleting booking:", error);
        }
      };

  return (
    <div className="Profile">
      <h1>Booked House:</h1>
      {bookedHouses.map((house) => (
        <div key={house.id}>
          <h2>{house.name}</h2>
          <img src={house.imageUrl} alt={house.name} />
          <p>Description: {house.description}</p>
          <p>Address: {house.address}</p>
          <p>Booked Dates:</p>
          <ul>
            {house.bookedDates.map((date, index) => (
              <li key={index}>{date}</li>
            ))}
          </ul>
          <button onClick={handleDeleteBooking}>Delete Booking</button>
        </div>
      ))}
    </div>
  );
}