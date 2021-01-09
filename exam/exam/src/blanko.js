import React, {useRef} from 'react';
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
import {STRS} from "./data/blankoData";
import {getFirstHidden} from "web-vitals/dist/lib/getFirstHidden";


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


export default function Slido() {
  const classes = useStyles();
  const history = useHistory();
  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const [checkFlag, setCheckFlag] = useState(0);
  const [correctCounter, setCorrectCounter] = useState(0);


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

  function BlankoBox(){
    console.log(STRS);
    let randomNumber = parseInt(Math.random()*7,10);
    let randomString = STRS[randomNumber];
    randomString = randomString.split('');
    console.log(randomString);
    const boxContent = randomString.map((char,index) => {
      if (index === 1){
        return <span style={{border:'2px solid black', padding:'5px' ,width: '15px'}}><input style={{width:'40px', height:'50px', fontSize:'50px'}} ref={firstRef}/></span>
      }else if (index === 5){
        return <span style={{border:'2px solid black', padding:'5px' ,width: '15px'}}><input style={{width:'40px', height:'50px', fontSize:'50px'}} ref={secondRef}/></span>
      }else if (index === 10){
        return <span style={{border:'2px solid black', padding:'5px' ,width: '15px'}}><input style={{width:'40px', height:'50px', fontSize:'50px'}} ref={thirdRef} onChange={()=>{setCheckFlag(checkFlag+1)}}/></span>
      } else {
        return <span style={{border:'2px solid black', padding:'5px' ,width: '15px'}}>{char}</span>
      }
    })
    return (
      <div>
        {boxContent}
      </div>
    )
  }
  useEffect(()=>{
    let randomNumber = parseInt(Math.random()*7,10);
    let randomString = STRS[randomNumber];
    randomString = randomString.split('');
    console.log(randomString);
    const first = randomString[1];
    const second = randomString[5];
    const third = randomString[10];
    console.log(first);
    console.log(firstRef.current.value);
    if (first === firstRef && second === secondRef && third === thirdRef){
      setCorrectCounter(correctCounter+1)
    }
    localStorage.setItem('correct',correctCounter);


  },[checkFlag])
  function changeQuestion() {
    setCheckFlag(checkFlag+1);
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
          <BlankoBox/>
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          <Button onClick={changeQuestion} color="textPrimary">RESET</Button>
        </Typography>
      </Container>

      {/* Footer */}
      <Container  component="footer" className={classes.footer} style={{backgroundColor:'#999999', height:'50px', position:'absolute', bottom:'0' ,width:'100%'}}>
        <Grid container spacing={4} justify="space-evenly">
        </Grid>

      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
