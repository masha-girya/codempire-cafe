import React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Header } from '../../screens/header';
import { BottomBar } from 'components/bottom-bar';
import { MainButton } from 'components/button';
import { Icon } from 'components/icon';
import { ProductCard } from '../../screens/product-card';
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
    handleClick,
    handleAdd,
    handleRemove,
    isItemInCart,
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
          <button
            type="button"
            className="product-page__back-link"
            onClick={handleClick}
          >
            <Icon type="back" />
            Back
          </button>

          <div className="product-page__info-block">
            <div className="product-page__image">
              <img
                className="product-page__image"
                alt="product image"
                src={`data:image/png;base64,${product?.image}`}
              />
            </div>

            <div className="product-page__info">
              <h1 className="product-page__info--title">{product?.title}</h1>
              <h3 className="product-page__info--description">
                {product?.description}
              </h3>

              <h4 className="product-page__info--subtitle">
                {location.pathname.includes('dish')
                  ? 'Ingredients:'
                  : 'Contains:'}
              </h4>

              <p className="product-page__info--text">
                {product?.ingredients.join(', ')}
              </p>

              <h4 className="product-page__info--subtitle">Allergens:</h4>

              <p className="product-page__info--text">
                {product?.allergens ? product?.allergens : 'None'}
              </p>
            </div>

            <div className="product-page__actions">
              <div className="product-page__price">
                <h2 className="product-page__price--text">
                  {`${product?.price}uah`}
                </h2>

                <h2 className="product-page__price--text">
                  {`${product?.weight}g`}
                </h2>
              </div>

              <div className="product-page__buttons">
              {isItemInCart
                ? (
                  <MainButton
                    type="button"
                    text="Remove"
                    onHandleClick={handleRemove}
                    isActive={true}
                  />)
                : (
                  <MainButton
                    type="button"
                    text="Add to cart"
                    onHandleClick={handleAdd}
                  />)
              }
                <MainButton
                  type="button"
                  text="Skip"
                  isSecondary={true}
                  onHandleClick={handleRemove}
                />
              </div>
            </div>
          </div>

          <hr className="product-page__line" />

          <div>
            <h4 className="product-page__subtitle">Tastes best with:</h4>
            <div className="product-page__recommend-block">
              {recommended.map((card) => (
                <ProductCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomBar />
    </div>
  );
};
