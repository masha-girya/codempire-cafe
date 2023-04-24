import React from 'react';
import { ProductEdit } from 'screens/product-edit';
import { Product, Recommended } from '../../components';
import { IDish, IMenu, ROLE } from 'types';
import { useAppSelector } from 'store';
import { PATHNAME_CONSTANTS as PATHNAME } from 'constants-app';

interface IProps {
  pathname: string,
  product: IDish | IMenu,
  handleReload: () => void,
  recommended: IDish[] | IMenu[],
}

export const ProductWrapper = (props: IProps) => {
  const { role } = useAppSelector(state => state.user);
  const {
    product,
    pathname,
    recommended,
    handleReload,
  } = props;

  const isOnEdit = role === ROLE.manager && pathname.includes(PATHNAME.EDIT);

  return (
    <>
      {isOnEdit
        ? <ProductEdit product={product} />
        : (
          <>
            <Product product={product} />
            <Recommended handleReload={handleReload} recommended={recommended} />
          </>
      )}
    </>
  );
};
