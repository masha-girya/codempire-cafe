import React, { memo } from 'react';
import { BackButton } from 'components/back-button';
import { ProductActions, ProductInfo } from '../../components';
import { IDish, IMenu } from 'types';
import './product.scss';

interface IProps {
  product: IDish | IMenu,
}

export const Product = memo(({ product } : IProps) => {
  return (
    <div className="product-page">
      <BackButton />

      <div className="product__info-block">
        <div className="product__image">
          <img
            className="product__image"
            alt="product image"
            src={`data:image/png;base64,${product.image}`}
          />
        </div>

        <ProductInfo product={product} />

        <ProductActions product={product} />
      </div>

      <hr className="product__line" />
    </div>
  );
});

Product.displayName = 'Product';
