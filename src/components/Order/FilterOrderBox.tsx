import { useContext, useEffect, useReducer } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import type { FilteredOrder, OrderFilterAction, OrderFilterState } from '../../Models/Models';
import AppContext from '../../Contexts/AppContext';


const initialState: OrderFilterState = {
  userId: '',
  minAmount: '',
  maxAmount: '',
};


function orderFilterReducer(state: OrderFilterState, action: OrderFilterAction): OrderFilterState {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    case 'SET_MIN_AMOUNT':
      return { ...state, minAmount: action.payload };
    case 'SET_MAX_AMOUNT':
      return { ...state, maxAmount: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}


const FilterOrderBox :  React.FC<{ setFilteredOrders: React.Dispatch<React.SetStateAction<FilteredOrder[]>> }>= ( { setFilteredOrders } ) => {
  const [filterState, dispatch] = useReducer(orderFilterReducer, initialState);
debugger;
  const { startLoading, stopLoading } = useContext(AppContext);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    handleFilter()  
  }, []);

  const handleFilter = async () => {
    try {
      startLoading();
      const response = await fetch(`${baseUrl}/api/order/filterOrders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filterState),
      });
      const data = await response.json();
      console.log('Filtered orders:', data);
      setFilteredOrders(data);
      // Handle the filtered data, e.g., update parent component or context
    } catch (error) {
      console.error('Error filtering orders:', error);
    } finally {
      stopLoading();
    }
  };

  const handleClear = () => {
    dispatch({ type: 'RESET' });
handleFilter();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order Filter
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="User ID"
            type="number"
            value={filterState.userId}
            onChange={(event) => dispatch({ type: 'SET_USER_ID', payload: event.target.value })}
          />
          <TextField
            label="Min Amount"
            type="number"
            value={filterState.minAmount}
            onChange={(event) => dispatch({ type: 'SET_MIN_AMOUNT', payload: event.target.value })}
          />
          <TextField
            label="Max Amount"
            type="number"
            value={filterState.maxAmount}
            onChange={(event) => dispatch({ type: 'SET_MAX_AMOUNT', payload: event.target.value })}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleFilter}>
            Filter
          </Button>
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
        </Box>
      </Paper>

    
    </Box>
  );
};

export default FilterOrderBox;
