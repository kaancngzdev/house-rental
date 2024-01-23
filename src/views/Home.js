import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Box from '@mui/material/Box';
import SimpleSlider from '../components/Slider';
import CardSlider from '../components/CardSlider'; // Import the CardSlider component here
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [houses, setHouses] = useState([]);
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHouses() {
      try {
        const housesCollection = collection(db, 'Houses');
        const housesSnapshot = await getDocs(housesCollection);
        const housesData = housesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHouses(housesData);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    }

    fetchHouses();
  }, [db]);

  const handleLearnMore = (id) => {
    navigate(`/houses/${id}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          maxWidth: '1000px',
        }}
      >
        <div style={{ marginBottom: '5rem' }}>
          <SimpleSlider />
        </div>
        <div>
          <h1>Most Popular Houses</h1>
        </div>
        <div>
          {/* Render the CardSlider component and pass houses data */}
          <CardSlider cardData={houses} />
        </div>
      </Box>
    </div>
  );
};

export default Home;
