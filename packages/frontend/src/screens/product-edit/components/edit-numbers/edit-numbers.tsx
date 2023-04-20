import React, { ChangeEventHandler, memo } from 'react';
import { EditSingleValue } from '../../components';
import './edit-numbers.scss';

interface IProps {
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  isDish: boolean,
  price: string,
  weight: string,
  errorsPrice: string | undefined,
  errorsWeight: string | undefined,
}

export const EditNumbers = memo((props: IProps) => {
  const {
    handleChange,
    isDish,
    price,
    weight,
    errorsPrice,
    errorsWeight,
  } = props;

  return (
    <div className="numbers">
      {isDish && (
        <EditSingleValue
          name="weight"
          value={weight}
          handleChange={handleChange}
          errorsValue={errorsWeight}
        />
      )}

      <EditSingleValue
        name="price"
        value={price}
        handleChange={handleChange}
        errorsValue={errorsPrice}
      />
    </div>
  );
});

EditNumbers.displayName= 'EditNumbers';
