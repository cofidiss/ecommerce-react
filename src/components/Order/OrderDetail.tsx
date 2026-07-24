import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AppContext from '../../Contexts/AppContext';
import type { OrderDetails } from '../../Models/Models';

const OrderDetail: React.FC<{ orderId: number }> = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);
  const [error, setError] = useState<string>('');
  const { startLoading, stopLoading, setModal2State } = useContext(AppContext);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  const handleClose = () => {
    setModal2State({
      isOpen: false,
      title: '',
      message: '',
    });
  };
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        startLoading();
        setError('');

        const url = `${baseUrl}/api/order/getOrderDetails?orderId=${orderId}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }

        const data = await response.json();
        const normalizedData = Array.isArray(data) ? data : [data];
        setOrderDetails(normalizedData as OrderDetails[]);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Order details could not be loaded.');
      } finally {
        stopLoading();
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <Box sx={{ p: 2, position: 'relative' }}>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'white',
          bgcolor: 'error.main',
          '&:hover': {
            bgcolor: 'error.dark',
          },
          boxShadow: 2,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
          Order Details
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'common.white', fontWeight: 700 }}>Id</TableCell>
              <TableCell sx={{ color: 'common.white', fontWeight: 700 }}>User</TableCell>
              <TableCell sx={{ color: 'common.white', fontWeight: 700 }}>Product Id</TableCell>
              <TableCell sx={{ color: 'common.white', fontWeight: 700 }}>Quantity</TableCell>
              <TableCell sx={{ color: 'common.white', fontWeight: 700 }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No order detail found.
                </TableCell>
              </TableRow>
            ) : (
              orderDetails.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.amount} ₺</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderDetail;
