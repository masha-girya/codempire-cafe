import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Header } from '../../screens/header';
import { Loader } from 'components/loader';
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

      <div className="product-page">
        {isLoading && (
          <div className="product-page--util">
            <Loader isDark={true} />
          </div>)
        }
        {isError && (
          <div className="product-page--util">
            <p>Something went wrong</p>
          </div>)
        }
        {isOnAdd && <ProductEdit product={productToAdd} isOnAdd={isOnAdd} />}
        {product && (
          <ProductWrapper
            product={product}
            pathname={pathname}
            recommended={recommended}
            handleReload={handleReload}
          />)
        }
      </div>

      <BottomBar />
    </div>
  );
};
