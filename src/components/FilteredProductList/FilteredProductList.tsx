import React from 'react';
import { FilteredProduct } from '../../Models/Models';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const FilteredProductList: React.FC<{ filteredProducts: FilteredProduct[] }> = ({ filteredProducts }) => {

    const addToBasket = (productId: number) => {
        throw new Error('Function not implemented.');
    }

  if (filteredProducts.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary">
          No products found. Please adjust your filters and try again.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>İşlem</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Ürün Adı</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Fiyat</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Miktar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map(product => (
            <TableRow key={product.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => addToBasket(product.id)}
                  sx={{ textTransform: 'none' }}
                >
                  Ekle
                </Button>
              </TableCell>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell align="right">{product.price} ₺</TableCell>
              <TableCell align="right">{product.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FilteredProductList;