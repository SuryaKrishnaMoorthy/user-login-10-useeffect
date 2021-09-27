import React, { Fragment, useState } from "react";
import MainHeader from './components/MainHeader/MainHeader';
import Login from './components/Login/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
  }

  const logoutHandler = () => {
    setIsLoggedIn(false);
  }

  return (
    <Fragment>
      <MainHeader />
      <main>
        { !isLoggedIn && <Login onLogin={loginHandler} />}
        { isLoggedIn && <Home onLogout={logoutHandler} /> }
      </main>
    </Fragment>
  );
}

export default App;
