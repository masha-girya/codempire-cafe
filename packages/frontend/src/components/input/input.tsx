import React from 'react';
import TextField from '@mui/material/TextField';
import { useInput } from '../input';
import './input.scss';

interface IProps {
  type: string,
  placeholder: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  isPass: boolean,
  helperText?: string | boolean,
  id?: string,
  name?: string,
  error?: boolean,
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
  } = props;

  const { passType, setPassType } = useInput();

  const handlePassTypeChange = () => {
    setPassType((prevType) => prevType === 'password' 
      ? 'text' 
      : 'password'
    );
  };

  return (
    <div className="Input Input__container">
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
    </div>
  );
};
