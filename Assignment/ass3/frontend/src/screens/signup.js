import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PORT_NUM } from "./components/action";
import { useHistory } from 'react-router-dom';
import Copyright from './components/copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const classes = useStyles();
  const [doubleCheckHint, setDoubleCheckHint] = useState('');
  const [emailHint, setEmailHint] = useState('');
  const [passHint, setPassHint] = useState('');
  const [nameHint, setNameHint] = useState('');
  const doubleCheckPassRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const history = useHistory();
  function checkEmailSign() {
    let emailValue = document.getElementById('signupEmail').value;
    if (emailValue === '') {
      document.getElementById('signupEmail').style.backgroundColor = 'rgb(201,89,77)';
      return false;
    } else {
      document.getElementById('signupEmail').style.backgroundColor = '';
      return true;
    }
  }
  //check name valid
  function checkNameSign() {
    let nameValue = document.getElementById('signupName').value
    if (nameValue === '') {
      document.getElementById('signupName').style.backgroundColor = 'rgb(201,89,77)';
      return false;
    } else {
      document.getElementById('signupName').style.backgroundColor = '';
      return true;
    }
  }
  //check password not empty
  function checkPassSign() {
    let passwordValue = document.getElementById('signupPassword').value;
    if (passwordValue === '') {
      document.getElementById('signupPassword').style.backgroundColor = 'rgb(201,89,77)';
      return false;
    } else {
      document.getElementById('signupPassword').style.backgroundColor = '';
      return true;
    }
  }
  //check password same as last input
  function checkConfirm() {
    let passValue = document.getElementById('signupPassword').value;
    let doubleCheckValue = document.getElementById('signupDoublePassword').value
    if ('' === doubleCheckValue) {
      document.getElementById('signupDoublePassword').style.backgroundColor = 'rgb(201,89,77)';
      return false;
    } else {
      document.getElementById('signupDoublePassword').style.backgroundColor = '';
      return true;
    }
  }
  function cancelSignUp() {
    history.push('../login');
  }

  //submit the sign message
  function submitSignButton(event) {
    event.preventDefault();
    let emailValue = document.getElementById('signupEmail').value;
    let passwordValue = document.getElementById('signupPassword').value;
    let nameValue = document.getElementById('signupName').value;
    const data = { "email": emailValue, "password": passwordValue, "name": nameValue };
    //check input before fetch
    if (!checkConfirm() || !checkEmailSign() || !checkNameSign()) {
      alert('Something is empty or double check the password');
    }
    let para = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    fetch(`http://localhost:${PORT_NUM}/admin/auth/register`, para).then(res => {
      if (res.status === 200) {
        res.json().then(res => {
          // save token here
          console.log(res['token']);
          dispatch({ type: 'setToken', value: res['token'] });
          history.push('../dashBoard');
        })
      } else {
        res.json().then(res => {
          console.log(res['error']);
          alert(res['error']);
          return false;
        })
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome to BigBrain
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                ref={emailRef}
                onChange={checkEmailSign}
                variant="outlined"
                required
                fullWidth
                id="signupEmail"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                ref={nameRef}
                onChange={checkNameSign}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="signupName"
                label="User Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                ref={passRef}
                onChange={checkPassSign}
                variant="outlined"
                required
                fullWidth
                id="signupPassword"
                label="Password"
                name="signupPassword"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                ref={doubleCheckPassRef}
                onChange={checkConfirm}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="signupDoublePassword"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitSignButton}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" onClick={cancelSignUp}>
                Already have an account? Login in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
