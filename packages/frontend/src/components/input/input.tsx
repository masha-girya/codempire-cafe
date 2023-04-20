import React from 'react';
import TextField from '@mui/material/TextField';
import { Icon } from 'components/icon';
import { useInput } from '../input';
import './input.scss';

interface IProps {
  type: string,
  placeholder?: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  isPass?: boolean,
  helperText?: string | boolean,
  id?: string,
  name?: string,
  error?: boolean,
  isFullWidth?: boolean,
  isMultiple?: boolean,
  handleMultiple?: (value: string) => void,
  isNumeric?: boolean,
}

export const Input = (props: IProps) => {
  const {
    id,
    name,
    type,
    error,
    value,
    isPass,
    onChange,
    helperText,
    placeholder,
    isFullWidth,
    isMultiple,
    handleMultiple,
    isNumeric,
  } = props;

  const {
    passType,
    handleKeyDown,
    handlePassTypeChange,
    handleMultipleChange,
  } = useInput({ value, handleMultiple });

  return (
    <div className= {isFullWidth
      ? 'Input Input--full-width Input__container'
      : 'Input Input__container'}>
      <TextField
        type={type === 'password' ? passType : type}
        label={placeholder}
        variant="outlined"
        value={value}
        onChange={onChange}
        InputLabelProps={{
          style: { color: '#1E1E1E' },
        }}
        helperText={helperText}
        id={id}
        name={name}
        error={error}
        onKeyDown={handleKeyDown}
        inputProps={{ inputMode: isNumeric ? 'numeric' : 'text'}}
      />

      {isPass && (
        <button
          type="button"
          className={passType === 'password'
            ? 'Input__password-eye-button'
            : 'Input__password-eye-button Input__password-eye-button--cross'
          }
          onClick={handlePassTypeChange}
        />
      )}

      {isMultiple && (
        <button
          type="button"
          onClick={handleMultipleChange}
          className="Input__multiple-button"
        >
          <Icon type="plus" />
        </button>
      )}
    </div>
  );
};
