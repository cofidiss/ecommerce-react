import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Button } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import FilterProductComponent from './components/FilterProduct/FilterProduct';


function App() { 
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  console.log('App renderer');

  const handleGetBasket = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/basket/getBasket`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Basket:', data);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to fetch basket:', error);
    }
  };

  return (
<Box
  bgcolor={"white"}
  sx={{
    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)', // Yumuşak kenar gölgesi
    borderRadius: 3, // Hafif köşe yumuşatma
    m: 2, // Dış boşluk
    p: 2, // İç boşluk
    transition: 'box-shadow 0.3s', // Smooth geçiş
    minHeight: '100vh', 
    minWidth: '100%', // Ekran genişliğini kapla
  }}
>
  <Button variant="contained" onClick={handleGetBasket} sx={{ mb: 2 }}>
    Get Basket
  </Button>
  <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />   
                <Route path="/filter" element={<FilterProductComponent />} /> 
  </Routes>
</Box>


  );
}

export default App
