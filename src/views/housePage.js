import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function HousePage() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    async function fetchHouse() {
      try {
        const houseDocRef = doc(db, 'Houses', id);
        const houseDocSnapshot = await getDoc(houseDocRef);

        if (houseDocSnapshot.exists()) {
          setHouse(houseDocSnapshot.data());
        } else {
          setError('House not found');
        }
      } catch (error) {
        setError('Error fetching house');
        console.error('Error fetching house:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHouse();
  }, [db, id]);

  console.log('House ID:', id);
  console.log('House Data:', house);
  console.log('Loading:', loading);
  console.log('Error:', error);

  return (
    <div>
      <h2>House Page</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {house && (
        <div>
          <h3>{house.propertyType}</h3>
          <p>Price: {house.price}</p>
          <p>Description: {house.description}</p>
          {house.imageUrl && <img src={house.imageUrl} alt="House" style={{ maxWidth: '100%' }} />} {/* Display house image */}
          {/* Display other details */}
        </div>
      )}
    </div>
  );
}
