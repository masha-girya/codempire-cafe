import React from 'react';
import { Loader } from 'components/loader';
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
    handleReload,
  } = useProductState({ productOnLoad });

  return (
    <div className="product-list">
      {isLoading && (
        <div  className="product-list__loader">
          <Loader isDark={true} />
        </div>)
      }

      <div className="product-list__container">
        {isError
          ? <p>Something went wrong</p>
          : products.map((prod: IDish | IMenu) => (
            <ProductCard
              key={prod.id}
              card={prod}
              handleReload={handleReload}
            />
          ))
        }
      </div>
    </div>
    
  );
};
