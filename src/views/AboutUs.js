import React, { useState, useEffect } from "react";
import { addHouseToFirestore } from "../back-end/addHouseFB";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function AboutUs() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const houseData = {
      propertyType,
      numRooms,
      area,
      price,
      description,
      imageUrl,
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
    <div>
      <h2>Add a House</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Property Type:
          <input
            type="text"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          />
        </label>
        <br />
        <label>
          Number of Rooms:
          <input
            type="text"
            value={numRooms}
            onChange={(e) => setNumRooms(e.target.value)}
          />
        </label>
        <br />
        <label>
          Area:
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
     <div>
        <h3>Available Houses</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {houses.map((house) => (
            <div key={house.id} style={{ margin: "10px" }}>
              <Link to={`/house/${house.id}`}>
                {/* Link each house image to its dynamic page */}
                <img src={house.imageUrl} alt={`House ${house.id}`} width="200" />
                <p>Price: {house.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
