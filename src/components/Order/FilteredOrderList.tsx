import { useContext, useState } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TableSortLabel, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppContext from '../../Contexts/AppContext';
import type { FilteredOrder } from '../../Models/Models';
import OrderDetail from './OrderDetail';

const FilteredOrderList: React.FC<{ filteredOrders: FilteredOrder[] }> = ({ filteredOrders }) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{ key: 'orderId' | 'userName' | 'orderAmount' | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
  const { setModal2State } = useContext(AppContext);

  const handleViewDetails = async (orderId: number) => {

           setModal2State({
        isOpen: true,
        title: "",
        children: (<OrderDetail orderId={orderId} />)

      });


  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (key: 'orderId' | 'userName' | 'orderAmount') => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedOrders = [...filteredOrders].sort((a, b) => {
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

  const paginatedOrders = sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 3, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
        Orders
      </Typography>
      {filteredOrders.length === 0 ? (
        <Typography color="text.secondary">No orders match the current filter.</Typography>
      ) : (
        <>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'common.white', fontWeight: 700, textTransform: 'uppercase' }}>
                  <TableSortLabel
                    active={sortConfig.key === 'orderId'}
                    direction={sortConfig.key === 'orderId' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('orderId')}
                    sx={{ color: 'common.white !important', fontWeight: 500 }}
                  >
                    Order ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 700, textTransform: 'uppercase' }}>
                  <TableSortLabel
                    active={sortConfig.key === 'userName'}
                    direction={sortConfig.key === 'userName' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('userName')}
                    sx={{ color: 'common.white !important', fontWeight: 500 }}
                  >
                    User Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 700, textTransform: 'uppercase' }}>
                  <TableSortLabel
                    active={sortConfig.key === 'orderAmount'}
                    direction={sortConfig.key === 'orderAmount' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('orderAmount')}
                    sx={{ color: 'common.white !important', fontWeight: 500 }}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 700, textTransform: 'uppercase' }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.orderId} hover>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.userName}</TableCell>
                  <TableCell>{order.orderAmount} ₺</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      aria-label="View details"
                      title="View details"
                      onClick={() => handleViewDetails(order.orderId)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredOrders.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      )}
    </Paper>
  );
};

export default FilteredOrderList;
