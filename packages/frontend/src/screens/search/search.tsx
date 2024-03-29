import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';
import { useSearch } from '../search';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import './search.scss';

export const Search = () => {
  const {
    ref,
    query,
    products,
    isError,
    isLoading,
    isSearching,
    setQuery,
    setProducts,
    setIsSearching,
  } = useSearch();

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleOpenSearch = () => {
    setIsSearching(!isSearching);
    setProducts([]);
  };

  return (
    <form className="search-form" ref={ref}>
      <input
        className="search-form__search"
        type="search"
        placeholder="Search"
        value={query}
        onChange={handleChangeQuery}
        onClick={handleOpenSearch}
      />
      <button className="search-form__button">
        <Icon type="search" />
      </button>

      {isSearching && (
        <div className="search-form__menu">
          {products.length > 0 && !isError && !isLoading ? (
            <ul className="search-form__list">
              {products.map((product) => {
                const { title, description, id, type } = product;

                return (
                  <div key={id}>
                    <li className="search-form__list--column">
                      <Link
                        className="search-form__list--link"
                        to={`${ROUTE.MAIN_PAGE}/${type}/${id}`}
                        onClick={handleOpenSearch}
                      >
                        <p className="search-form__list--title">{title}</p>
                        <p className="search-form__list--desc">{description}</p>
                      </Link>
                    </li>

                    <hr className="search-form__list--line" />
                  </div>
                );
              })}
            </ul>
          ) : (
            <p className="search-form__menu-text">Type to search</p>
          )}

          {isLoading && <p className="search-form__menu-text">Searching...</p>}

          {isError && (
            <p className="search-form__menu-text">Something went wrong</p>
          )}
        </div>
      )}
    </form>
  );
};
