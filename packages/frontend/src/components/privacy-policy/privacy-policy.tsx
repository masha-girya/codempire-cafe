import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'screens/header';
import { BottomBar } from 'components/bottom-bar';
import { API_CONSTANTS as API } from 'constants-app';
import './privacy-policy.scss';

export const PrivacyPolicy = () => {
  return (
    <>
      <Header />

      <div className="privacy-policy">
        <h1 className="privacy-policy__title">Hello!👋 I am&nbsp;
          <Link
            target="_blanc"
            to={API.API_LINKEDIN}
            className="privacy-policy__link"
          >
            Maria
          </Link>
          , a Fullstack Developer</h1>

        <h3 className="privacy-policy__subtitle">
          I appreciate that you come to visit this website of Codempire-cafe.<br></br>
          I created it from scratch by myself, both: front and back.
        </h3>

        <div className="privacy-policy__list-box">
          <h4 className="privacy-policy__list-title">
            What can you do here as the User?
          </h4>
          <ul className="privacy-policy__list">
            <li>choose a dish you like</li>
            <li>add it to the cart</li>
            <li>add one more if you would like to</li>
            <li>then go to the cart and create an order</li>
            <li>and here is the most interesting thing: you can pay for it in crypto with MetaMask extension</li>
          </ul>
        </div>

        <div>
          <h4 className="privacy-policy__list-title">
            What can you do here as the Manager?
          </h4>
          <ul className="privacy-policy__list">
            <li>if your role is Manager than you have some admin options</li>
            <li>add new dishes and menus</li>
            <li>edit and delete dishes and menus</li>
            <li>accept orders (by the way, the user will get notification that his order is ready)</li>
            <li>and the manager will get notification when some user created new order</li>
          </ul>
        </div>

        <div>
          <h4 className="privacy-policy__list-title">
            What technologies did I use to create the website?
          </h4>
          <ul className="privacy-policy__list">
            <li>React & Material UI</li>
            <li>Nest.js & TypeORM & PostgreSQL</li>
            <li>Passport authentication & JWT</li>
            <li>Web3.js & MetaMask</li>
          </ul>
        </div>

        <h3 className="privacy-policy__subtitle">
          Enjoy!🤩
        </h3>
      </div>
      <BottomBar />
    </>
  );
};
