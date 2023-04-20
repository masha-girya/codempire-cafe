import React, { ChangeEvent } from 'react';
import { Input } from 'components/input';
import './edit-single-value.scss';

interface IProps {
  name: string,
  value: string,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  errorsValue: string | undefined,
  isFullWidth?: boolean,
}

export const EditSingleValue = (props: IProps) => {
  const {
    name,
    value,
    errorsValue,
    isFullWidth,
    handleChange,
  } = props;

  return (
    <div>
      <label htmlFor={name} className="label">
        {name[0].toUpperCase() + name.slice(1)}
      </label>

      <Input
        type="text"
        name={name}
        id={name}
        isFullWidth={isFullWidth}
        value={value}
        onChange={handleChange}
        error={Boolean(errorsValue)}
        helperText={errorsValue}
      />
    </div>
  );
};
