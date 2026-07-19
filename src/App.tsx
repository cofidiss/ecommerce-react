import './App.css'
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import FilterProductComponent from './components/FilterProduct/FilterProduct';
import Basket from './components/Basket/Basket';
import FilterOrder from './components/Order/FilterOrder';

function App() {
  return (
    <Box
      bgcolor="white"
      sx={{
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
        borderRadius: 3,
        m: 2,
        p: 2,
        transition: 'box-shadow 0.3s',
        minHeight: '100vh',
        minWidth: '100%',
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<FilterProductComponent />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/orders" element={<FilterOrder />} />     
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Box>
  );
}

export default App
