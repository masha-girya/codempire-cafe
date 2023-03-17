import React from 'react';
import { ProductCard } from 'components/product-card';
import './product-list.scss';

export const ProductList = () => {
  return (
    <div className="product-list">
      {Array(3).fill(1).map((card: number, i: number) => (
        <ProductCard key={i} />
      ))}
    </div>
  );
};
