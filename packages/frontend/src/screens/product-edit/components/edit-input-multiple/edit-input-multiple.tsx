import React, { memo } from 'react';
import { Chip } from 'components/chip';
import { Input } from 'components/input';
import { IChangeProductFunctions } from 'types';
import './edit-input-multiple.scss';

interface IProps {
  inputName: string,
  chipName: string,
  chipValue: string[],
  inputValue: string,
  errorsValue: string | string[] | undefined,
  errorsChip: string | undefined,
  changeFunctions: IChangeProductFunctions,
}

export const EditInputMultiple = memo((props: IProps) => {
  const {
    inputName,
    chipName,
    chipValue,
    inputValue,
    changeFunctions,
    errorsValue,
    errorsChip,
  } = props;
  const {
    handleChange,
    handleChipAdd,
    handleChipRemove,
  } = changeFunctions;

  const handleAdd = () => handleChipAdd(
    inputValue,
    chipValue,
    chipName,
    inputName,
  );

  return (
    <div className="edit-input-multiple">
      <label htmlFor={inputName} className="edit-input-multiple__label">
        {`${chipName[0].toUpperCase()}${chipName.slice(1)}:`}
      </label>

      <div className={chipValue.length > 0
        ? 'edit-input-multiple__field'
        : 'edit-input-multiple__field edit-input-multiple__field--empty'}
      >
        <Chip
          name={chipName}
          values={chipValue}
          handleValueRemove={handleChipRemove}
        />
      </div>

      <Input
        type="text"
        name={inputName}
        id={inputName}
        isMultiple={true}
        handleMultiple={handleAdd}
        placeholder={`Add ${chipName}`}
        value={inputValue}
        onChange={handleChange}
        error={Boolean(errorsValue) || Boolean(errorsChip)}
        helperText={errorsValue as string || errorsChip}
      />
    </div>
  );
});

EditInputMultiple.displayName = 'EditInputMultiple';
