import { useState } from 'react';

export const useTransaction = () => {
  const [ metaResponse, setMetaResponse ] = useState<Error | string | null>(null);

  return {
    metaResponse,
    setMetaResponse,
  };
};
