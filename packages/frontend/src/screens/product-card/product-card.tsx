import React from 'react';
import { Link } from 'react-router-dom';
import { MainButton } from 'components/button';
import { IDish, IMenu } from 'types';
import { useProductCard } from '../product-card';
import './product-card.scss';

interface IProps {
  card: IDish | IMenu,
}

export const ProductCard = (props: IProps) => {
  const { card } = props;
  const {
    id,
    title,
    description,
    ingredients,
    weight,
    price,
    image,
   } = card;

   const {
    link,
    isItemInCart,
    handleAdd,
    handleRemove,
    isLoggedIn,
  } = useProductCard({ id, card });

  return (
    <div className="card">
      <div className="card__content">
        <Link
          to={`${link}/${id}`}
          className="card__content"
        >
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
        </Link>

          {isItemInCart
            ? (
              <MainButton
                type="button"
                text="Remove"
                isSmall={true}
                onHandleClick={handleRemove}
                isActive={true}
              />)
            : (
              <MainButton
                type="button"
                text="To cart"
                isSmall={true}
                onHandleClick={handleAdd}
                isDisabled={isLoggedIn}
              />)
          }
        </div>
    </div>
  );
};
