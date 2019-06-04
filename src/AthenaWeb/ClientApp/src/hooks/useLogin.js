import { useReducer, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';

const useLogin = () => {
  const [authState, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { loggedIn: true, token: action.token };
      case 'LOGOUT':
        return { loggedIn: false, token: '' };
      default:
        return state;
    }
  }, { loggedIn: false, token: '' });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token && moment(token.expires) > moment.utc()) {
      dispatch({ type: 'LOGIN', token: token.token });
    }
  }, []);


  const login = (creds) => {
    Axios.post('api/auth', creds)
      .then((res) => {
        dispatch({ type: 'LOGIN', token: res.data.token });
        localStorage.setItem('token', JSON.stringify({ token: res.data.token, expires: res.data.expires }));
      });
  };

  const logout = () => {
    dispatch('LOGOUT');
  };

  return { login, logout, authState };
};

export default useLogin;
