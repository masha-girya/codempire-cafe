import React from 'react';
import './mark.scss';

interface IProps {
  rating: number,
  hover: number,
  rateArray: number[],
  handleRate: (num: number) => void,
  handleHoverOn: (num: number) => void,
  handleHoverOut: () => void,
}

export const Mark = (props: IProps) => {
  const {
    rating,
    hover,
    rateArray,
    handleRate,
    handleHoverOn,
    handleHoverOut,
  } = props;

  return (
    <div className="mark">
      <div>
        <p className="mark__info">Your mark:</p>

        <div className="mark__rating">
          {rateArray.map((star, index) => {
            index += 1;
            const handleRateChange = () => handleRate(index);
            const handleHover = () => handleHoverOn(index);

            return (
              <button
                type="button"
                key={index}
                className={
                  index <= (hover || rating)
                    ? 'mark__button mark__rating--on'
                    : 'mark__button mark__rating--off'
                }
                onClick={handleRateChange}
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
              >
                <span className="mark__rating" />
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mark__info">Status:</p>
        <p className="mark__subtitle">Delivered</p>
      </div>
    </div>
  );
};
