import React, {useState} from 'react';
import FilterProductbox from '../FilterProductBox/FilterProductBox';
import FilterProductList from '../FilteredProductList/FilteredProductList';
import { FilteredProduct } from '../../Models/Models';

const FilterProduct = () => {
    const [filteredProducts, setFilteredProducts] = useState<FilteredProduct[]>([]);
  return (
    <div>
      <FilterProductbox setFilteredProducts={setFilteredProducts} />
      <FilterProductList filteredProducts={filteredProducts} />
    </div>
  );
};

export default FilterProduct;