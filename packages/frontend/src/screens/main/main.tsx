import React from 'react';
import { Header } from 'components/header';
import { BottomBar } from 'components/bottom-bar';
import { ProductList, Sidebar } from '../main';
import './main.scss';

export const Main = () => {
  return (
    <div className="main">
      <Header />

      <div className="main__container">
        <Sidebar />
        <ProductList />
      </div>

      <BottomBar />
    </div>
  );
};
