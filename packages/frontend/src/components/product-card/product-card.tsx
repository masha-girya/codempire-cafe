import React from 'react';
import { MainButton } from 'components/button';
import { IDish } from 'utils/types';
import './product-card.scss';

interface IProps {
  card: IDish,
}

export const ProductCard = ({ card }: IProps) => {
  const {
    title,
    description,
    weight,
    price,
    image,
   } = card;

  return (
    <div className="container-card">
      <div className="card">
        <div className="card__content">
          <img src={`data:image/png;base64,${image}`} className="card__image" />

          <div className="card__main-info">
            <p className="card__title">{title}</p>
            <p className="card__description">
              {description}
            </p>

            <div className="card__info">
              <h3 className="card__price">{`${price}uah`}</h3>
              <h3 className="card__weight">{`${weight}g`}</h3>
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
