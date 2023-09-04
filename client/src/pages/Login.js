import { useState } from "react";
import { useContext } from 'react';
import { Context } from '../App';
import workoutPic from "/home/michoel/post-grad-apps/fit-tracker/client/src/pictures/man-working-out-2294361.jpg"
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signup, setSignup] = useState(false)
    const context = useContext(Context);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
    function handleSubmit(e) {
        e.preventDefault();
        const user = {
          username: e.target.username.value,
          password: e.target.password.value,
        };
        if (signup) {
          fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
          .then((r) => {
            if (r.ok) {
              return r.json();
            } else {
              throw new Error('Signup request failed');
            }
        })
          .then((r) => {
            setUsername('');
            setPassword('');
            context.setIsLoggedIn(true)
        })
          .catch((error) => {
            console.error('Error occurred during signup:', error);
            alert('Invalid input');
        });
        } else {
        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
          .then((r) => {
            if (r.ok) {
              return r.json();
            } else {
              throw new Error('Login request failed');
            }
        })
          .then((r) => {
            setUsername('');
            setPassword('');
            context.setIsLoggedIn(true)
        })
          .catch((error) => {
            console.error('Error occurred during login:', error);
            alert('Invalid input');
        });
        }
      };

    function handleSignupLoginClick() {
        setSignup(prev => !prev)
        setUsername('');
        setPassword('');
      };
    if (signup) {
      return (
        <>
          <img alt="Man doing pushups" src={workoutPic} className="w-full max-h-screen object-center object-cover"/>
          <div className="absolute top-36 left-1/2 transform -translate-x-1/2 mx-auto p-6 min-w-[30%] bg-gray-100 bg-opacity-75 rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            <div className="mt-4 flex items-center justify-center">
              <span className="text-sm text-gray-600">Already have an account?</span>
              <button
                onClick={handleSignupLoginClick}
                className="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </button>
          </div>
        </div>
    </>
      )
    }
    else {
    return (
    <>
      <img alt="Man doing pushups" src={workoutPic} className="w-full max-h-screen object-center object-cover"/>
      <div className="absolute top-36 left-1/2 transform -translate-x-1/2 mx-auto p-6 min-w-[30%] bg-gray-100 bg-opacity-75 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        <div className="mt-4 flex items-center justify-center">
          <span className="text-sm text-gray-600">Don't have an account?</span>
          <button
            onClick={handleSignupLoginClick}
            className="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </button>
      </div>
    </div>
</>
  )
}
}

export default Login