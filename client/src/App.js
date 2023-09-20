import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import MyWorkout from './pages/MyWorkout';
import Navbar from './componants/Navbar';
import { useState, useEffect } from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import LoggedInNavbar from './componants/LoggedInNavbar';
export const Context = React.createContext()

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [workouts, setWorkouts] = useState(null)
    const [myWorkouts, setMyWorkouts] = useState(null)
    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState(null)
    const [workoutDropdown, setWorkoutDropdown] = useState('All')

    useEffect(() => {
          fetch('check_session')
          .then(r => r.json())
          .then(r => {
          if(r.error === 'unauthorized') {
              setUser(null)
              return
          }
          setIsLoggedIn(true)
          setUser(r)
      })
          .then(() => {
            if (isLoggedIn) {
              fetch('user_workouts')
              .then(r => r.json())
              .then(r => {
                setMyWorkouts(r)
            })
            }
          }
          )
      }, [isLoggedIn])
    
    useEffect(() => {
          fetch('workouts')
              .then(r => r.json())
              .then(r => {
                setWorkouts(r)
          })
          .then(
              fetch('messages')
                .then(r => r.json())
                .then(r => {
                  setMessages(r)
            })
          )
      }, [])

    
      
  return (
      <>
        <Context.Provider value={{ isLoggedIn, setIsLoggedIn, messages, setMessages, workouts, setWorkouts, myWorkouts, setMyWorkouts, user, workoutDropdown, setWorkoutDropdown }}>
        {isLoggedIn ? <LoggedInNavbar /> : <Navbar />}
          <Routes>
              <Route path='/' element={isLoggedIn ? <Home /> : <Login />} />
              <Route path='/myWorkouts' element={<MyWorkout />} />
          </Routes>
        </Context.Provider>
      </>
  );
}

export default App;
