import  {useContext, useEffect, useState} from 'react';

import { FilteredOrder} from '../../Models/Models';
import FilterOrderBox from './FilterOrderBox';
import FilteredOrderList from './FilteredOrderList';
import { IsAdmin } from '../../services/authService';
import AppContext from '../../Contexts/AppContext';



const FilterOrder = () => {
    const [filteredOrders, setFilteredOrders] = useState<FilteredOrder[]>([]);
  const { startLoading, stopLoading } = useContext(AppContext);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const [isAdminState, setIsAdminState] = useState<boolean | null>(null);
debugger;
console.log('isAdminState:', isAdminState);
  const getUserOrders = async () => {
    try {
      startLoading();
      const response = await fetch(`${baseUrl}/api/order/getUserOrder`, {
        method: 'GET'});
      const data = await response.json();
      console.log('Filtered USER orders:', data);
      setFilteredOrders(data);
      // Handle the filtered data, e.g., update parent component or context
    } catch (error) {
      console.error('Error filtering orders:', error);
    } finally {
      stopLoading();
    }
  };
    useEffect(() => {
        IsAdmin(baseUrl).then((result: boolean) => {
          setIsAdminState(result);
        })
    }  ,[]      
    )

    useEffect(() => {
        if (isAdminState === false) {
            getUserOrders();
        }
        console.log('Filtered USER orders updated:', filteredOrders);
    }  ,[isAdminState] );

  return (
    <div>
      {isAdminState && <FilterOrderBox setFilteredOrders={setFilteredOrders} />}
      <FilteredOrderList filteredOrders={filteredOrders} />
    </div>
  );
};

export default FilterOrder;