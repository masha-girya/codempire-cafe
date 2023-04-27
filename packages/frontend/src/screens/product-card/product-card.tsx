import React from 'react';
import { Link } from 'react-router-dom';
import { ManagerActions } from 'screens/manager-actions';
import { UserActions } from './components';
import { IDish, IMenu, ROLE } from 'types';
import { useProductCard } from '../product-card';
import './product-card.scss';

interface IProps {
  card: IDish | IMenu,
  handleReload: () => void,
}

export const ProductCard = (props: IProps) => {
  const { card, handleReload } = props;
  const {
    id,
    title,
    description,
    ingredients,
    weight,
    price,
    image,
   } = card;

   const { link, role } = useProductCard({ id, card });

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

          {role === ROLE.user
            ? <UserActions card={card} id={id} />
            : (
              <ManagerActions
                id={id}
                isMenu={'dishesId' in props.card ? true : false}
                handleReload={handleReload}
                isProductCard={true}
              />)
          }
        </div>
    </div>
  );
};
