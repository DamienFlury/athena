import React, { useState, useContext } from 'react';
import {
  makeStyles, Typography, TextField, Button,
} from '@material-ui/core';
import { useSpring, animated } from 'react-spring';
import AuthContext from '../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    boxShadow: theme.shadows[5],
    overflow: 'hidden',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  input: {
    marginTop: '20px',
  },
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const props = useSpring({
    maxWidth: '840px', padding: '20px 20px', opacity: 1, from: { maxWidth: '0px', padding: '20px 0px', opacity: 0 }, config: { tension: 400, mass: 1 },
  });
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <animated.div className={classes.wrapper} style={props}>
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" className={classes.input} value={email} onChange={e => setEmail(e.target.value)} fullWidth />
        <TextField label="Password" type="password" fullWidth className={classes.input} value={password} onChange={e => setPassword(e.target.value)} />
        <Button variant="contained" type="submit" className={classes.input} color="secondary" fullWidth>Login</Button>
      </form>
    </animated.div>
  );
};

export default Login;
