import React, { useReducer, useEffect, useState, useContext } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { FilterProductState, CategoryLov, FilteredProduct } from '../../Models/Models';
import AppContext from '../../Contexts/AppContext';

type FilterState = FilterProductState;

type FilterAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_MIN_PRICE'; payload: number }
  | { type: 'SET_MAX_PRICE'; payload: number }
  | { type: 'SET_CATEGORY_ID'; payload: number }
  | { type: 'RESET' };

const initialState: FilterState = {
  name: '',
  minPrice: 0,
  maxPrice: 0,
  categoryId: 0,
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_MIN_PRICE':
      return { ...state, minPrice: action.payload };
    case 'SET_MAX_PRICE':
      return { ...state, maxPrice: action.payload };
    case 'SET_CATEGORY_ID':
      return { ...state, categoryId: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const FilterProductBox: React.FC<{ setFilteredProducts: React.Dispatch<React.SetStateAction<FilteredProduct[]>> }> = ({ setFilteredProducts }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const [categories, setCategories] = useState<CategoryLov[]>([]);
  const { startLoading, stopLoading } = useContext(AppContext);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        startLoading();
        const response = await fetch(`${baseUrl}/api/product/getCategoryLov`);
        const data: CategoryLov[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        stopLoading();
      }
    };
    fetchCategories();
    handleFilter();
  }, []);

  const handleFilter = async () => {
    try {
      startLoading();
      const response = await fetch(`${baseUrl}/api/product/filterProducts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });
      const data = await response.json();
      console.log('Filtered products:', data);
      setFilteredProducts(data);
      // Handle the filtered data, e.g., update parent component or context
    } catch (error) {
      console.error('Error filtering products:', error);
    } finally {
      stopLoading();
    }
  };

  const handleClear = () => {
    dispatch({ type: 'RESET' });
    handleFilter();
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2}}>
      <Typography variant="h6" gutterBottom>
        Filter Products
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <TextField
            label="Product Name"
            value={state.name}
            onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
            sx={{ minWidth: 200 }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={state.categoryId}
              label="Category"
              onChange={(e) => dispatch({ type: 'SET_CATEGORY_ID', payload: Number(e.target.value) })}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2, minWidth: 300 }}>
            <TextField
              label="Min Price"
              type="number"
              value={state.minPrice}
              onChange={(e) => dispatch({ type: 'SET_MIN_PRICE', payload: Number(e.target.value) })}
              sx={{ minWidth: 140 }}
            />
            <TextField
              label="Max Price"
              type="number"
              value={state.maxPrice}
              onChange={(e) => dispatch({ type: 'SET_MAX_PRICE', payload: Number(e.target.value) })}
              sx={{ minWidth: 140 }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleFilter}>
            Filter
          </Button>
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterProductBox;
