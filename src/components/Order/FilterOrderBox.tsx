import { useContext, useEffect, useReducer, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import type { FilteredOrder, OrderFilterAction, OrderFilterState, UserLov } from '../../Models/Models';
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
  const [users, setUsers] = useState<UserLov[]>([]);
  const { startLoading, stopLoading } = useContext(AppContext);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        startLoading();
        const response = await fetch(`${baseUrl}/api/user/getUserLov`);
        const data: UserLov[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        stopLoading();
      }
    };

    fetchUsers();
    handleFilter();
  }, []);

  const handleFilter = async (stateToUse: OrderFilterState = filterState) => {
    try {
      startLoading();
      const response = await fetch(`${baseUrl}/api/order/filterOrders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stateToUse),
      });
      const data = await response.json();
      setFilteredOrders(data);
    } catch (error) {
      console.error('Error filtering orders:', error);
    } finally {
      stopLoading();
    }
  };

  const handleClear = () => {
    dispatch({ type: 'RESET' });
    handleFilter(initialState);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order Filter
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel id="user-select-label">User</InputLabel>
            <Select
              labelId="user-select-label"
              label="User"
              value={filterState.userId}
              onChange={(event) => dispatch({ type: 'SET_USER_ID', payload: event.target.value })}
            >
              <MenuItem value="">
                <em>All Users</em>
              </MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={String(user.id)}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2, minWidth: 260, flex: 1 }}>
            <TextField
              label="Min Amount"
              type="number"
              value={filterState.minAmount}
              onChange={(event) => dispatch({ type: 'SET_MIN_AMOUNT', payload: event.target.value })}
              sx={{ minWidth: 120 }}
            />
            <TextField
              label="Max Amount"
              type="number"
              value={filterState.maxAmount}
              onChange={(event) => dispatch({ type: 'SET_MAX_AMOUNT', payload: event.target.value })}
              sx={{ minWidth: 120 }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={() => handleFilter(filterState)}>
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
