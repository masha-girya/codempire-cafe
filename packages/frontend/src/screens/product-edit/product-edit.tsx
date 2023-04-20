import React from 'react';
import { EditImage, EditLeftSection } from './components';
import { BackButton } from 'components/back-button';
import { IDish, IMenu } from 'types';
import { useProductEdit } from './product-edit.state';
import './product-edit.scss';

interface IProps {
  product: IDish | IMenu,
  isOnAdd?: boolean,
}

export const ProductEdit = ({ product, isOnAdd } : IProps) => {
  const {
    formik,
    isSuccess,
    handleKeyDown,
    handleImageUpload,
  } = useProductEdit({ product });

  return (
    <>
      <BackButton />

      <form className="product-edit__form" onKeyDown={handleKeyDown}>
        <EditImage
          image={formik.values.image}
          handleChange={handleImageUpload}
        />

        <EditLeftSection isOnAdd={isOnAdd} formik={formik} isSuccess={isSuccess} />
      </form>
    </>
  );
};
