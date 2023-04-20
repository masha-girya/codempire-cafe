import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Header } from '../../screens/header';
import { BottomBar } from 'components/bottom-bar';
import { ProductWrapper } from './components';
import { ProductEdit } from 'screens/product-edit';
import { useProductPage } from '../product-page';
import './product-page.scss';

export const ProductPage = () => {
  const params = useParams();
  const {
    recommended,
    product,
    isError,
    isLoading,
    handleReload,
    isOnAdd,
    productToAdd,
    pathname,
  } = useProductPage({
    id: params.id,
  });

  return (
    <div>
      <Header />

      <Outlet />

      {isLoading && <p>Loading...</p>}

      {isError && <p>Something went wrong</p>}

      {isOnAdd && (
        <div className="product-page">
          <ProductEdit
            product={productToAdd}
            isOnAdd={isOnAdd}
          />
        </div>)
      }

      {product && (
        <div className="product-page">
          <ProductWrapper
            product={product}
            pathname={pathname}
            recommended={recommended}
            handleReload={handleReload}
          />
        </div>
      )}

      <BottomBar />
    </div>
  );
};
