import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Auth } from 'screens/auth';
import { Error } from 'screens/error';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTE.HOME} element={<Auth isSignUp={false} isStart={true} />} />

      <Route path={ROUTE.REGISTRATION} element={<Auth isSignUp={true} isStart={true} />} />

      <Route path={ROUTE.MAIN_PAGE} element={<h1>HOME</h1>} />

      <Route path={ROUTE.REGISTRATION_ADD_INFO} element={<Auth isSignUp={true} isStart={false} />} />

      <Route path={ROUTE.ERROR} element={<Error />} />
    </Routes>
  );
};

export default App;
