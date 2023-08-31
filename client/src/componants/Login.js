import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../App';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(Context);
    // let navigate = useNavigate();
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };
    // test user: 'Taylor Reed' password: 123
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
      function handleSubmit(e) {
        e.preventDefault();
        const userLogin = {
          username: e.target.username.value,
          password: e.target.password.value,
        };
        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userLogin),
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

      function handleSignupClick() {
        // navigate('/signup');
      }
    return (
    <div className='containerStyle'>
      <form className='formStyle' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className='labelStyle'>
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className='inputStyle'
          />
        </div>
        <div>
          <label htmlFor="password" className='labelStyle'>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className='inputStyle'
          />
        </div>
        <div >
          <button type="submit" className='submitButtonStyle'>
            Login
          </button>
        </div>
      </form>
      <div className='signUpDiv'>
      <span >Don't have an account?</span>
      <button onClick={handleSignupClick} className='signUpButtonStyle'>
            Sign up
      </button>
      </div>
    </div>
  );
}

export default Login