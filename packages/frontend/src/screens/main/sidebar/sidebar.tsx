import React from 'react';
import { FilterBar } from 'components/filter-bar';
import { Icon } from 'components/icon';
import { useSidebar } from '../../main';
import './sidebar.scss';

export const Sidebar = () => {
  const { foodCategories, drinkCategories } = useSidebar();

  return (
    <div className="sidebar">
      <p className="sidebar__title">
        <Icon type="filter" />
        Filter
      </p>
      <hr className="sidebar__line" />

      <div className="sidebar__category-box">
        <FilterBar categories={drinkCategories} title="Drinks" />
      </div>

      <div className="sidebar__category-box">
        <FilterBar categories={foodCategories} title="Food" />
      </div>
    </div>
  );
};
