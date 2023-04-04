import React from 'react';
import { ProductCard } from 'screens/product-card';
import { IDish, IMenu } from 'types';
import { useProductState } from '../product-list';
import './product-list.scss';

interface IProps {
  productOnLoad: 'menus' | 'dishes',
}

export const ProductList = (props: IProps) => {
  const { productOnLoad } = props;
  const {
    products,
    isLoading,
    isError,
  } = useProductState({ productOnLoad });

  return (
    <div className="product-list__container">
      <div className="product-list">
        {isLoading && <p>Loading...</p>}

        {isError
          ? <p>Something went wrong</p>
          : products.map((prod: IDish | IMenu) => (
            <ProductCard
              key={prod.id}
              card={prod}
            />
          ))
        }
      </div>
    </div>
    
  );
};
