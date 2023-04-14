import React from 'react';
import { Link } from 'react-router-dom';
import { MainButton } from 'components/button';
import { Icon } from 'components/icon';
import { IProduct } from 'types';
import { useCartItem } from '../cart-modal-item';
import { cutText } from 'utils/helpers';
import './cart-modal-item.scss';

interface IProps {
  product: IProduct,
}

export const CartItem = (props: IProps) => {
  const { product, amount } = props.product;
  const {
    link,
    numPrice,
    handleRemove,
    handleIncrease,
    handleDecrease,
  } = useCartItem(props.product);

  const {
    image,
    title,
    description,
  } = product;

  return (
    <div className="item">
      <div className="item__box">
        <div className="item__info">
          <img
            alt="dish"
            src={`data:image/png;base64,${image}`}
            className="item__info-image"
          />

          <Link to={`${link}/${product.id}`} className="item__link">
            <h4 className="item__info-title">{title}</h4>
            <p className="item__info-description">
              {cutText(description)}
            </p>
          </Link>
        </div>

        <div className="item__info-amount">
          <button
            type="button"
            className="item__remove"
            onClick={handleDecrease}
          >
            <Icon type="minus" />
          </button>

          <p className="item__amount">{amount}</p>

          <button
            type="button"
            className="item__add"
            onClick={handleIncrease}
          >
            <Icon type="plus" />
          </button>
        </div>
      </div>

      <div className="item__box">
        <MainButton
          type="button"
          text="Remove"
          onHandleClick={handleRemove}
          isSecondary={true}
          isSuperSmall={true}
        />

        <h3 className="item__main-text">{`${amount * numPrice}uah`}</h3>
      </div>
    </div>
  );
};
