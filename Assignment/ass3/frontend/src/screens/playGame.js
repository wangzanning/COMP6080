import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import QuestionCard from './components/questionCard';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import {PORT_NUM} from "./components/action";
import Copyright from './components/copyright'

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

export default function PlayGame() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(state => state.token).token;
  const [stage, setStage] = useState(0)
  const playerId = useParams().playerId;
  const gameId = useParams().gameId;
  console.log(`Get player ID from URL is ${playerId}`);
  const [question, setQuestion] = useState({
    text: 'Temp',
    answer: [],
  });

  //log out to the main page
  function loginOut(){
    fetch(`http://localhost:${PORT_NUM}/admin/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(()=>{
      dispatch({ type: 'setToken', value: '' });
      history.push('../login')
    })
  }

  /**
   * Once the stage is increamented, fetch next question and update state.
   */
  useEffect(() => {
    fetch(`http://localhost:${PORT_NUM}/play/${playerId}/question`)
      .then(res => res.json())
      .then(res => {
        const q = res.question;
        console.log(res)
        setQuestion({ ...q });
      })
      .catch(err => console.log(err))

  }, [stage]);

  /**
   * Before move to next question, check game status to decided if move stage.
   * If the status is started after advance, fetch next question. Otherwise,
   * display the game result which means final question has been answered.
   */
  const nextQuestion = () => {
    fetch(`http://localhost:${PORT_NUM}/admin/quiz/${gameId}/advance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        getGameStatus().then(status => {
          if (status.started) setStage(res.stage); // Update stage to fetch next question
          // TODO: DISPLAY GAME RESULT OF CURRENT GAME (I.E. PLAYER'S PERFORMANCE)
          else {}
        })
      });
  }

  /**
   * End the game once the button of end game is clicked.
   */
  const endGame = () => {
    fetch(`http://localhost:${PORT_NUM}/admin/quiz/${gameId}/end`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => {
        dispatch({ type: 'setID', value: '' });
        console.log('Stop Game Response', res)
      });
  }

  /**
   * Get the status of the game to determine if update the state of stage.
   */
  const getGameStatus = () => {
    return fetch(`http://localhost:${PORT_NUM}/play/${playerId}/status`)
      .then(res => res.json());
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            BigBrain
          </Typography>
          <Button color="primary" variant="outlined" className={classes.link} onClick={endGame}>
            End game
          </Button>
          <Button color="primary" variant="outlined" className={classes.link} onClick={loginOut}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {/*main componment*/}
          <QuestionCard question={question} />
          <Button color="secondary" variant="outlined" className={classes.link} size='large' onClick={nextQuestion}>
            NEXT
          </Button>
        </Grid>
      </Container>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">

        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}
