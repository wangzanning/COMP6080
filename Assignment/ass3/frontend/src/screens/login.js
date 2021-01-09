import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { PORT_NUM } from "./components/action";
import { useHistory } from 'react-router-dom';
import Copyright from './components/copyright'

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginIn() {
  const classes = useStyles();
  const emailRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  /**
   * Validate the input of email return boolean value
   */
  const checkEmail = () => {
    let emailValue = document.getElementById('loginEmail').value
    if (emailValue === '') {
      document.getElementById('loginEmail').style.backgroundColor = 'rgb(201,89,77)';
      return false;
    } else {
      document.getElementById('loginEmail').style.backgroundColor = '';
      return true;
    }
  }

  /**
   * Validate the input of password
   */
  const checkPass = () => {
    let passwordValue = document.getElementById('loginPassword').value
    if (passwordValue === '') {
      document.getElementById('loginPassword').style.backgroundColor = 'rgb(201,89,77)'
      return false;
    } else {
      document.getElementById('loginPassword').style.backgroundColor = ''
      return true;
    }
  }

  /**
   * Direct to sign up page
   */
  const showSignUpButton = () => {
    history.push('../signUp');
  }

  /**
   * Hanlde the submition of login form
   * @param {object} event 
   */
  function submitLogin(event) {
    event.preventDefault();
    let emailValue = document.getElementById('loginEmail').value
    let passwordValue = document.getElementById('loginPassword').value
    if (! checkEmail() || ! checkPass()){
      alert("Username or keyword should not be empty");
      return false;
    }

    // const emailValue = 'asd@unsw.edu.au';
    // const passwordValue = 'asd';
    // const emailValue = 'willzhou0305@gamil.com';
    // const passwordValue = '';
    let data = { "email": emailValue, "password": passwordValue };
    console.log(data);
    let para = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    fetch(`http://localhost:${PORT_NUM}/admin/auth/login`, para).then(res => {
      if (res.status === 200) {
        res.json().then(res => {
          // save token here
          dispatch({ type: 'setToken', value: res['token'] });
          console.log(res['token']);
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
          <TextField
            ref={emailRef}
            onInput={checkEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="loginEmail"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            ref={passRef}
            onInput={checkPass}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="loginPassword"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={submitLogin}
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login In
          </Button>
          <Grid container>
            <Grid item>
              <Link variant="body2" onClick={showSignUpButton}>
                {"Don't have an account? Sign Up Now!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
