import { useCallback, useState } from 'react';

export const useReload = () => {
  const [ isReload, setIsReload ] = useState(false);

  const handleReload = useCallback(() => (
    setIsReload(!isReload)
  ), [isReload]);

  return { isReload, handleReload };
};
