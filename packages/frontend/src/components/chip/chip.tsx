import React from 'react';
import { Icon } from 'components/icon';
import './chip.scss';

interface IProps {
  values: string[],
  name: string,
  handleValueRemove: (value: string, currentValue: string[], valueName: string) => void,
}

export const Chip = (props: IProps) => {
  const {
    name,
    values,
    handleValueRemove,
  } = props;

  return (
    <>
      {values.map(value => {
        const handleChange = () => handleValueRemove(value, values, name);

        return (
          <div
            className="chip"
            key={value}
          >
            <p>{value}</p>
            <button
              type="button"
              className="chip__button"
              onClick={handleChange}
            >
              <Icon type="chip" />
            </button>
          </div>
        );
      })}
    </>
  );
};
