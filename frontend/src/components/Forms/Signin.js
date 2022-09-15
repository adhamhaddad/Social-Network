import React, { useState, useRef, useEffect } from 'react';
import LoginError from './LoginError/LoginError';
import './Styles.css';

function Signin(props) {
  const [enableLogin, setEnableLogin] = useState(false);
  const [validateForm, setValidateForm] = useState({
    username: '',
    password: '',
    remember: false
  });

  const usernameHandler = (e) => {
    setValidateForm((prev) => {
      return {
        ...prev,
        username: e.target.value
      };
    });
  };
  const passwordHandler = (e) => {
    setValidateForm((prev) => {
      return {
        ...prev,
        password: e.target.value
      };
    });
  };

  const checkboxHandler = (e) => {
    setValidateForm((prev) => {
      return {
        ...prev,
        remember: e.target.value
      };
    });
  };

  const signupChangeHandler = (e) => {
    e.preventDefault();
    props.switchForm(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.loginValidate(validateForm.username, validateForm.password);
    setValidateForm({
      username: '',
      password: '',
      remember: ''
    });
  };

  return (
    <div className='container form'>
      <div className='switch-box'>
        <a href='/login' className={props.login ? 'active' : null}>
          <span>log in</span>
        </a>
        <a href='/register' onClick={signupChangeHandler}>
          <span>register</span>
        </a>
      </div>
      <ul className='links'>
        <li>
          <a href='#' rel='noreferrer'>
            <i className='fa-brands fa-facebook'></i>
          </a>
        </li>
        <li>
          <a href='#' rel='noreferrer'>
            <i className='fa-brands fa-twitter'></i>
          </a>
        </li>
        <li>
          <a href='#' rel='noreferrer'>
            <i className='fa-brands fa-google'></i>
          </a>
        </li>
      </ul>
      <form
        action='/authenticate'
        method='POST'
        autoComplete='on'
        onSubmit={submitHandler}
      >
        {props.error && <LoginError status={true}/>}

        <input
          type='text'
          placeholder='User Name'
          id='user'
          title='User Name'
          name='username'
          value={validateForm.username}
          onChange={usernameHandler}
          required
        />
        <input
          type='password'
          placeholder='Password'
          id='pass'
          title='Password'
          name='password'
          minLength='8'
          value={validateForm.password}
          onChange={passwordHandler}
          required
        />
        <label className='checkbox'>
          <input
            type='checkbox'
            id='check'
            name='check'
            value={validateForm.remember}
            onChange={checkboxHandler}
          />
          <span>remember me</span>
        </label>
        <button type='submit' disabled={enableLogin}>
          log in
        </button>
      </form>
    </div>
  );
}
export default Signin;
