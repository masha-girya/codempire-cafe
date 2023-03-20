import React from 'react';
import { ProductCard } from 'components/product-card';
import { IDish } from 'utils/types';
import { useProductState } from '../product-list';
import './product-list.scss';

export const ProductList = () => {
  const { dishes, isLoading, isError } = useProductState();

  return (
    <div className="product-list">
      {isLoading && <p>Loading...</p>}

      {isError
        ? <p>{isError}</p>
        : dishes.map((card: IDish) => (
          <ProductCard key={card.id} card={card} />
        ))
      }
    </div>
  );
};
