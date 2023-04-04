import React from 'react';
import { FilterBar } from 'components/filter-bar';
import { Icon } from 'components/icon';
import { useSidebar } from './sidebar.state';
import './sidebar.scss';

export const Sidebar = () => {
  const { category } = useSidebar();
  const { drinks, food } = category;

  return (
    <div className="sidebar">
      <p className="sidebar__title">
        <Icon type="filter" />
        Filter
      </p>
      <hr className="sidebar__line" />

      <div className="sidebar__category-box">
        <FilterBar categories={drinks} title="Drinks" />
      </div>

      <div className="sidebar__category-box">
        <FilterBar categories={food} title="Food" />
      </div>
    </div>
  );
};
