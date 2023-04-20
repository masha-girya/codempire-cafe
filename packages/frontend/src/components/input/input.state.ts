import { useState } from 'react';
import { PassType } from '../input';

interface IProps {
  value: string,
  handleMultiple?: (value: string) => void,
}

export const useInput = ({ value, handleMultiple }: IProps) => {
  const [ passType, setPassType ] = useState<PassType>('password');

  const handlePassTypeChange = () => {
    setPassType((prevType) => prevType === 'password' 
      ? 'text' 
      : 'password'
    );
  };

  const handleMultipleChange = () => {
    if(handleMultiple) {
      return handleMultiple(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && handleMultiple) {
      handleMultiple(value);
    }
  };

  return {
    passType,
    handleKeyDown,
    handlePassTypeChange,
    handleMultipleChange,
  };
};
