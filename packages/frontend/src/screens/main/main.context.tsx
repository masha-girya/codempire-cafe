/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';

interface IFilterContext {
  filter: string[],
  setFilter: React.Dispatch<React.SetStateAction<string[]>>,
}

export const FilterContext = React.createContext<IFilterContext>({
  filter: [],
  setFilter: () => {},
});

interface IProps {
  children: React.ReactNode,
}

export function FilterContextProvider(props: IProps) {
  const { children } = props;

  const [ filter, setFilter ] = useState<string[]>([]);

  const values = { filter, setFilter};

  return (
    <FilterContext.Provider value={values}>
      {children}
    </FilterContext.Provider>
  );
}
