import { useCallback, useEffect, useRef, useState } from 'react';
import { ISearchProduct } from 'utils/types';
import { useRequest } from 'utils/hooks/api.hook';
import { getSearchProducts } from '.';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState<ISearchProduct[] | []>([]);
  const { sendUniqueRequest, isError, isLoading } = useRequest();
  const ref = useRef<HTMLFormElement>(null);

  const checkIfClickedOutside = useCallback(
    (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        isSearching &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setIsSearching(false);
        setQuery('');
      }
    },
    [isSearching]
  );

  useEffect(() => {
    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isSearching]);

  const load = useCallback(async () => {
    const request = () => getSearchProducts(query);
    const searchingProducts = await sendUniqueRequest(request);

    setProducts(searchingProducts || []);
  }, [query]);

  useEffect(() => {
    load();
  }, [query]);

  return {
    ref,
    query,
    products,
    isError,
    isLoading,
    isSearching,
    setQuery,
    setProducts,
    setIsSearching,
  };
};
