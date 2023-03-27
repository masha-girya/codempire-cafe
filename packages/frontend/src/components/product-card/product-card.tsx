import React from 'react';
import { Link } from 'react-router-dom';
import { MainButton } from 'components/button';
import { IDish, IMenu } from 'utils/types';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';
import './product-card.scss';

interface IProps {
  card: IDish | IMenu,
}

export const ProductCard = (props: IProps) => {
  const {
    id,
    title,
    description,
    ingredients,
    weight,
    price,
    image,
   } = props.card;

   const link = 'dishesId' in props.card
    ? ROUTE.MAIN_PAGE_MENU
    : ROUTE.MAIN_PAGE_DISH;

  return (
    <div className="container-card">
      <Link
        to={`${link}/${id}`}
        className="card"
      >
        <div className="card__content">
          <img src={`data:image/png;base64,${image}`} className="card__image" />

          <div className="card__main-info">
            <p className="card__title">{title}</p>
            <p className="card__description">
              {'dishesId' in props.card
                ? ingredients?.join(', ')
                : description
              }
            </p>

            <div className="card__info">
              <h3 className="card__price">{`${price}uah`}</h3>
              <h3 className="card__weight">{`${weight}g`}</h3>
            </div>
          </div>

          <MainButton
            type="button"
            text="To cart"
            isSmall={true}
          />
        </div>
      </Link>
    </div>
  );
};
