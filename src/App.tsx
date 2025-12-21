import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

function App() { console.log('App renderer');
  return (
<Box
  bgcolor={"white"}
  sx={{
    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)', // Yumuşak kenar gölgesi
    borderRadius: 3, // Hafif köşe yumuşatma
    m: 2, // Dış boşluk
    p: 2, // İç boşluk
    transition: 'box-shadow 0.3s', // Smooth geçiş
  }}
>
  <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />   
  </Routes>
</Box>


  );
}

export default App
