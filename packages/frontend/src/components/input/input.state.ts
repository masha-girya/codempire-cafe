import { useState } from 'react';
import { PassType } from '../input';


export const useInput = () => {
  const [ passType, setPassType ] = useState<PassType>('password');

  return { passType, setPassType };
};
