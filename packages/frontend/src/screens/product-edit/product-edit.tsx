import React from 'react';
import { EditImage, EditLeftSection } from './components';
import { BackButton } from 'components/back-button';
import { IDish, IMenu } from 'types';
import { useProductEdit } from './product-edit.state';
import './product-edit.scss';

interface IProps {
  product: IDish | IMenu,
}

export const ProductEdit = ({ product } : IProps) => {
  const {
    formik,
    handleKeyDown,
    handleImageUpload,
  } = useProductEdit({product});

  return (
    <>
      <BackButton />

      <form className="product-edit__form" onKeyDown={handleKeyDown}>
        <EditImage
          image={formik.values.image}
          handleChange={handleImageUpload}
        />

        <EditLeftSection product={product} formik={formik} />
      </form>
    </>
  );
};
