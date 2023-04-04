import React, { memo } from 'react';
import { ProductCard } from 'screens/product-card';
import { IDish, IMenu } from 'types';
import './recommended.scss';

interface IProps {
  recommended: IDish[] | IMenu[],
}

export const Recommended = memo((props: IProps) => {
  const { recommended } = props;

  return (
    <div className="recommended">
        <h4 className="recommended__subtitle">
          Tastes best with:
        </h4>

        <div className="recommended__block">
          {recommended.map((card) => (
            <ProductCard key={card.id} card={card} />
          ))}
        </div>
      </div>
  );
});

Recommended.displayName = 'Recommended';
