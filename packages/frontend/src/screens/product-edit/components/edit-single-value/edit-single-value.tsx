import React, { ChangeEvent, memo } from 'react';
import { Input } from 'components/input';
import './edit-single-value.scss';

interface IProps {
  name: string,
  value: string,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  errorsValue: string | undefined,
  isFullWidth?: boolean,
  title?: string,
  isMultiple?: boolean,
  handleMultiple?: () => void,
}

export const EditSingleValue = memo((props: IProps) => {
  const {
    name,
    value,
    title,
    errorsValue,
    isFullWidth,
    isMultiple,
    handleChange,
    handleMultiple,
  } = props;

  return (
    <div className="edit-single">
      <label htmlFor={name} className="edit-single__label">
        {title ? title : name[0].toUpperCase() + name.slice(1)}
      </label>

      <div className="edit-single__field">
        <Input
          type="text"
          name={name}
          id={name}
          isFullWidth={isFullWidth}
          value={value}
          onChange={handleChange}
          error={Boolean(errorsValue)}
          helperText={errorsValue}
          isMultiple={isMultiple}
          handleMultiple={handleMultiple}
        />
      </div>
    </div>
  );
});

EditSingleValue.displayName = 'EditSingleValue';
