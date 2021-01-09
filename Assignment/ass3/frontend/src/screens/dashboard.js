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
import { PORT_NUM } from "./components/action";
import GameCard from './components/gameCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Copyright from './components/copyright';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


export default function Dashboard() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [showCreate, setShowCrate] = useState(false)
  // const [showDelete, setshowDelete] = useState(0)
  const token = useSelector(state => state.token).token;
  const history = useHistory();
  const dispatch = useDispatch();

  /**
   * Fetch quiz list and get each quiz's information that need to be
   * displayed in game card including quiz's title, number of question,
   * thumbnail and time to complete.
   * Quiz ID also need to be added, which will be given to GameCard.
   */
  function fetchQuizzes() {
    const para = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    fetch(`http://localhost:${PORT_NUM}/admin/quiz`, para)
      .then(res => res.json())
      .then(res => {
        const fetchedQuizzes = res.quizzes;
        // Promise all to fetch each quiz
        Promise.all(
          fetchedQuizzes.map(quiz => fetchQuizData(quiz.id))
        ).then(res => {
          const newQuizzes = res.map(quiz => {
            return {
              id: quiz.id,
              title: quiz.name,
              numQuestions: quiz.questions.length,
              thumbnail: quiz.thumbnail,
              totalTime: getTotalTime(quiz.questions)
            }
          });
          setQuizzes(newQuizzes);
        });
      })
  }

  /**
   * Fetch info of particular quiz by specifying quizID,
   * returned result should contains quiz ID in response JSON.
   * @param {number} quizId
   */
  const fetchQuizData = quizId => {
    console.log(`QuizId is ${quizId}`)
    return fetch(`http://localhost:${PORT_NUM}/admin/quiz/${quizId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json())
      .then(res => {
        res['id'] = quizId;
        return res;
      })
  }

  /**
   * Calculate the total time to complete each question in the current game
   * @param {array} questionList
   */
  const getTotalTime = questionList => {
    let totalTime = 0;
    questionList.map(question => totalTime += parseInt(question.timeLimit));
    return totalTime;
  }

  /**
   * Display fetched quizze
   */
  const QuizzesPart = () => {
    const cards = quizzes.map((quiz, i) => {
      return (
        <GameCard
        gameId={quiz.id}
        token={token}
        key={i}
        id={quiz.id}
        src={quiz.thumbnail}
        title={quiz.title}
        time={quiz.totalTime}
        numQuestions={quiz.numQuestions}>
      </GameCard>)
    });
    return (
      <Grid container spacing={4}>
        {cards}
      </Grid>
      )
  }
  //logout and set the token to null
  function logOut(){
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

  // Fetch existed quizz
  useEffect(() => {
    fetchQuizzes();
  }, [showCreate]);

  /**
   * Create a new game by specifying its name
   */
  function createGame(event) {
    event.preventDefault();
    const para = {
      method: 'POST',
      body: JSON.stringify({
        name: name
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    fetch(`http://localhost:${PORT_NUM}/admin/quiz/new`, para)
      .then(res => res.json())
      .then(res =>{
        const gameID = res.quizId;
        console.log(gameID);
        setShowCrate(false)
        history.push(`../dashBoard/gameDetail/${gameID}`);
      }).catch(res => console.log(res));
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Hi! Welcome to BigBrain!
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Play Now!
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
             You can play the game which made by other user at this page, and you can even make
              your own games and share with other, try now!!!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={()=>{setShowCrate(true)}}>
                    Create New Games
                  </Button>
                  {showCreate?<form onSubmit={createGame}>
                    <label style={{fontSize:'20px'}}>Give a name to the new game</label><br/>
                    <input type="text" onChange={e => {setName(e.target.value); setShowCrate(true)}} />
                    <button style={{backgroundColor:'rgb(55,72,172)', color:'rgb(255,255,255)', borderRadius:'5px', margin:'5px', padding:'5px'}} type="submit">Submit</button>
                  </form>:null}
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={logOut}>
                    Log out
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <QuizzesPart/>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          BigBrain
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Made by Zanning Wang and Weizhou Ren
        </Typography>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}
