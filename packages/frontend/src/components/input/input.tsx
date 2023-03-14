import React from 'react';
import TextField from '@mui/material/TextField';
import './input.scss';
import { useInput } from '../input';

interface IProps {
  type: string,
  placeholder: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  isPass: boolean,
  helperText?: string,
}

export const Input = (props: IProps) => {
  const {
    type,
    placeholder,
    value,
    onChange,
    isPass,
    helperText,
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
        className="Input__form-field"
        InputLabelProps={{
          style: { color: '#1E1E1E' },
        }}
        helperText={helperText}
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
