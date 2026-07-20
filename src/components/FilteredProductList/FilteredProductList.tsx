import React, { useContext, useState } from 'react';
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
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AppContext from '../../Contexts/AppContext';

const FilteredProductList: React.FC<{ filteredProducts: FilteredProduct[] }> = ({ filteredProducts }) => {
  const { startLoading, stopLoading } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{ key: 'id' | 'name' | 'price' | 'quantity' | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  const addToBasket = (productId: number) => {
   startLoading();


    fetch(`${baseUrl}/api/basket/addBasket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: productId, quantity: 1 }),
    })
      .then((response) => {
             debugger;
        if (response.ok) {
  
        } else {

        }
      })
      .catch(() => {

      })
      .finally(() => {
        stopLoading();
      });
    }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (key: 'id' | 'name' | 'price' | 'quantity') => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig.key) {
      return 0;
    }

    const directionMultiplier = sortConfig.direction === 'asc' ? 1 : -1;
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB) * directionMultiplier;
    }

    return (Number(valueA) - Number(valueB)) * directionMultiplier;
  });

  const paginatedProducts = sortedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
        <TableHead >
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>
              <TableSortLabel
                active={sortConfig.key === 'id'}
                direction={sortConfig.key === 'id' ? sortConfig.direction : 'asc'}
                onClick={() => handleSort('id')}
                sx={{ color: 'inherit', fontWeight: 500 }}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>
              <TableSortLabel
                active={sortConfig.key === 'name'}
                direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'}
                onClick={() => handleSort('name')}
                sx={{ color: 'inherit', fontWeight: 500 }}
              >
                Product Name
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
              <TableSortLabel
                active={sortConfig.key === 'price'}
                direction={sortConfig.key === 'price' ? sortConfig.direction : 'asc'}
                onClick={() => handleSort('price')}
                sx={{ color: 'inherit', fontWeight: 500 }}
              >
                Price
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
              <TableSortLabel
                active={sortConfig.key === 'quantity'}
                direction={sortConfig.key === 'quantity' ? sortConfig.direction : 'asc'}
                onClick={() => handleSort('quantity')}
                sx={{ color: 'inherit', fontWeight: 500 }}
              >
                Quantity
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedProducts.map(product => (
            <TableRow key={product.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => addToBasket(product.id)}
                  sx={{ textTransform: 'none' }}
                >
                  Add to Basket
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
      <TablePagination
        component="div"
        count={filteredProducts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
};

export default FilteredProductList;