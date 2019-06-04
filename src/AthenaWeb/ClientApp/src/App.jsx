import React from 'react';
import {
  CssBaseline,
  createMuiTheme,
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { blue } from '@material-ui/core/colors';
import { MuiThemeProvider } from '@material-ui/core/styles';

import AuthContext from './contexts/AuthContext';

import useLogin from './hooks/useLogin';
import MainApp from './components/MainApp';
import Login from './components/Login';


const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});


const App = () => {
  const { authState, login, logout } = useLogin();

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <AuthContext.Provider value={{ authState, login, logout }}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {authState.loggedIn ? <MainApp /> : <Login />}
        </MuiThemeProvider>
      </AuthContext.Provider>
    </MuiPickersUtilsProvider>
  );
};


export default App;
