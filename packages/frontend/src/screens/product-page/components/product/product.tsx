import React, { memo } from 'react';
import { Icon } from 'components/icon';
import { ProductActions, ProductInfo } from '../../components';
import { IDish, IMenu } from 'types';
import './product.scss';
import { useNavigate } from 'react-router-dom';

interface IProps {
  product: IDish | IMenu,
}

export const Product = memo(({ product } : IProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="product-page">
      <button
        type="button"
        className="product__back-link"
        onClick={handleClick}
      >
        <Icon type="back" />
        Back
      </button>

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
