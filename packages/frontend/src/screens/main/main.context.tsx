/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';

interface IFilterContext {
  filter: string[],
  setFilter: React.Dispatch<React.SetStateAction<string[]>>,
  sortBy: string,
  setSortBy: React.Dispatch<React.SetStateAction<string>>,
}

export const FilterContext = React.createContext<IFilterContext>({
  filter: [],
  setFilter: () => {},
  sortBy: '',
  setSortBy: () => {},
});

interface IProps {
  children: React.ReactNode,
}

export function FilterContextProvider(props: IProps) {
  const { children } = props;

  const [ filter, setFilter ] = useState<string[]>([]);
  const [ sortBy, setSortBy ] = useState('');

  const values = { filter, setFilter, sortBy, setSortBy };

  return (
    <FilterContext.Provider value={values}>
      {children}
    </FilterContext.Provider>
  );
}
