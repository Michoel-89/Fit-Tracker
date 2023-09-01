import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { useState, useEffect } from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
export const Context = React.createContext()

function App() {
    const [isLoggedin, setIsLoggedIn] = useState(false)
    const [workouts, setWorkouts] = useState(null)
    const [messages, setMessages] = useState(null)
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
    useEffect(() => {
          fetch('workouts')
          .then(r => r.json())
          .then(r => {
            setWorkouts(r)
          })
      }, [])
    useEffect(() => {
          fetch('messages')
          .then(r => r.json())
          .then(r => {
            setMessages(r)
          })
      }, [])
  return (
      <>
        <Context.Provider value={{ isLoggedin, setIsLoggedIn, messages, setMessages, workouts, setWorkouts}}>
          <Routes>
              <Route path='/' element={isLoggedin ? <Home /> : <Login />} />
          </Routes>
        </Context.Provider>
      </>
  );
}

export default App;
