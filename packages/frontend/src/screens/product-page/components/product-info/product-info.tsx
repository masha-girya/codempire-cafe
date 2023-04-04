import React, { memo } from 'react';
import { IDish, IMenu } from 'types';
import './product-info.scss';

interface IProps {
  product: IDish | IMenu,
}

export const ProductInfo = memo(({ product }: IProps) => {
  const {
    title,
    description,
    ingredients,
    allergens,
  } = product;

  return (
    <div className="info">
      <h1 className="info__title">{title}</h1>
      <h3 className="info__description">
        {description}
      </h3>

      <h4 className="info__subtitle">
        {location.pathname.includes('dish')
          ? 'Ingredients:'
          : 'Contains:'}
      </h4>

      <p className="info__text">
        {ingredients.join(', ')}
      </p>

      <h4 className="info__subtitle">Allergens:</h4>

      <p className="info__text">
        {allergens ? allergens : 'None'}
      </p>
    </div>
  );
});

ProductInfo.displayName = 'ProductInfo';
