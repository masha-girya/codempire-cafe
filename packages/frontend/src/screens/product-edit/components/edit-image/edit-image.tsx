import React, { ChangeEvent } from 'react';
import './edit-image.scss';

interface IProps {
  image: string,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const EditImage = (props: IProps) => {
  const { image, handleChange } = props;

  return (
    <div className="edit-image">
      <img
        className="edit-image__image"
        alt="product image"
        src={image}
      />

      <label className="edit-image__button">
        Change
        <input
          type="file"
          className="edit-image__input"
          accept="image/*"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};
