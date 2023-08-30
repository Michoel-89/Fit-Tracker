import './App.css';
import Home from './componants/Home';
import Login from './componants/Login';
import { useState, useEffect } from 'react';
import React from 'react';
export const Context = React.createContext()

function App() {
    const [isLoggedin, setIsLoggedIn] = useState(false)
    useEffect(() => {
      fetch('check_session')
      .then(r => r.json())
      .then(r => {
        if(r.error === 'unauthorized') {
          return
        }
        setIsLoggedIn(true)
      })
        }, [])
    function handleLogoutClick() {
          fetch('logout', {
              method: 'DELETE',
            }).then(() => {
              setIsLoggedIn(false)
          })
      }
  return (
      <>
        <button onClick={handleLogoutClick}>logout</button>
        <Context.Provider value={{ isLoggedin, setIsLoggedIn}}>
          {isLoggedin ? <Home /> : <Login />}
        </Context.Provider>
      </>
  );
}

export default App;
