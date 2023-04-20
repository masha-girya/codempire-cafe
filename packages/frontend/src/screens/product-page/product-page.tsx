import React from 'react';
import {
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Header } from '../../screens/header';
import { BottomBar } from 'components/bottom-bar';
import { Product, ProductWrapper, Recommended } from './components';
import { useProductPage } from '../product-page';
import './product-page.scss';

export const ProductPage = () => {
  const location = useLocation();
  const params = useParams();
  const {
    recommended,
    product,
    isError,
    isLoading,
    handleReload,
  } = useProductPage({
    id: params.id,
    location: location.pathname,
  });

  return (
    <div>
      <Header />

      <Outlet />

      {isLoading && <p>Loading...</p>}

      {isError && <p>Something went wrong</p>}

      {product && (
        <div className="product-page">
          <ProductWrapper
            product={product}
            pathname={location.pathname}
            recommended={recommended}
            handleReload={handleReload}
          />
        </div>
      )}

      <BottomBar />
    </div>
  );
};
