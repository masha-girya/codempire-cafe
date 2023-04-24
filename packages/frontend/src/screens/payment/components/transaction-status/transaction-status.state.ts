import { useCallback, useEffect, useState } from 'react';

interface IProps {
  metaResponse:  null | string | Error,
}

export const useTransactionStatus = ({ metaResponse }: IProps) => {
  const [ isCopied, setIsCopied ] = useState(false);

  const handleCopy = useCallback(async() => {
    navigator.clipboard.writeText(metaResponse as string);
    setIsCopied(true);
  }, [metaResponse]);

  useEffect(() => {
    setTimeout(() => setIsCopied(false), 3000);
  }, [isCopied]);

 return { handleCopy, isCopied };
};