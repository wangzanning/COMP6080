import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import StarIcon from '@material-ui/icons/StarBorder';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import logo from './assets/logo.png'
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));


export default function Tetro() {
  const classes = useStyles();
const history = useHistory();
  function redirectBlanko(){
    history.push('../blanko')
  }
  function redirectSlido() {
    history.push('../slido')
  }
  function redirectTetro() {
    history.push('../tetro')
  }
  function redirectHome(){
    history.push('../dashboard')
  }


  function MainPart() {
    return (
      <div>
        Terto part
      </div>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="#eeeeee" elevation={0} className={classes.appBar} style={{height:'80px'}}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <img src={logo} alt='logo' style={{width:'50px',height:'50px'}}/>
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" className={classes.link} onClick={redirectHome}>
              Home
            </Link>
            <Link variant="button" color="textPrimary" className={classes.link} onClick={redirectBlanko}>
              Blanko
            </Link>
            <Link variant="button" color="textPrimary" className={classes.link} onClick={redirectSlido}>
              Slido
            </Link>
            <Link variant="button" color="textPrimary" className={classes.link} onClick={redirectTetro}>
              Tetro
            </Link>
          </nav>

        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="red" gutterBottom>
          game content
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          tetro
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <MainPart />
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer} style={{backgroundColor:'#999999', height:'50px',position:'absolute', bottom:'0'}}>
        <Grid container spacing={4} justify="space-evenly">
        </Grid>

      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
