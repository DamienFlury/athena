import { useReducer } from 'react';
import Axios from 'axios';

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


  const login = (creds) => {
    Axios.post('api/auth', creds)
      .then((res) => {
        dispatch({ type: 'LOGIN', token: res.token });
      });
  };

  const logout = () => {
    dispatch('LOGOUT');
  };

  return { login, logout, authState };
};

export default useLogin;
