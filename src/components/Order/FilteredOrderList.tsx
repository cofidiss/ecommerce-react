import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import type { FilteredOrder } from '../../Models/Models';

const FilteredOrderList: React.FC<{ filteredOrders: FilteredOrder[] }> = ({ filteredOrders }) => {
  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Orders
      </Typography>
      {filteredOrders.length === 0 ? (
        <Typography color="text.secondary">No orders match the current filter.</Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.orderId} hover>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.userName}</TableCell>
                <TableCell>{order.orderAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default FilteredOrderList;
