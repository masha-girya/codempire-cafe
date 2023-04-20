import React, { ChangeEventHandler } from 'react';
import { EditSingleValue } from '../../components';
import './edit-numbers.scss';

interface IProps {
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  price: string,
  weight: string,
  errorsPrice: string | undefined,
  errorsWeight: string | undefined,
}

export const EditNumbers = (props: IProps) => {
  const {
    handleChange,
    price,
    weight,
    errorsPrice,
    errorsWeight,
  } = props;

  return (
    <div className="numbers">
      <EditSingleValue
        name="weight"
        value={weight}
        handleChange={handleChange}
        errorsValue={errorsWeight}
      />

      <EditSingleValue
        name="price"
        value={price}
        handleChange={handleChange}
        errorsValue={errorsPrice}
      />
    </div>
  );
};
