import React from 'react';
import { MainButton } from 'components/button';
import { cutDescription } from 'utils/helpers';
import './product-card.scss';

export const ProductCard = () => {
  return (
    <div className="container-card">
      <div className="card">
        <div className="card__content">
          <div className="card__image" />

          <div className="card__main-info">
            <p className="card__title">Some Salad</p>
            <p className="card__description">
              {cutDescription('Description')}
            </p>

            <div className="card__info">
              <h3 className="card__price">500 UAH</h3>
              <h3 className="card__weight">120g</h3>
            </div>
          </div>

          <MainButton
            type="button"
            text="To cart"
            isDisabled={false}
            isSmall={true}
          />
        </div>

      </div>
    </div>
  );
};
