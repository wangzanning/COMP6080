import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import LayersIcon from '@material-ui/icons/Layers';
import BarChartIcon from "@material-ui/icons/BarChart";
import { PORT_NUM } from './components/action';
import AddNewQuestion from './components/addNewQuestion.js';
import { Link, useParams, useHistory } from 'react-router-dom';
import EditCard from './components/editCard';
import { useDispatch, useSelector } from 'react-redux';
import Copyright from './components/copyright';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function EditGame() {

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const gameId = useParams().gameId; // Get gameId from URL
  const token = useSelector(state => state.token).token;

  const [addFlag, setAddFlag] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailFlag, setThumbnailFlag] = useState(false);
  const [currentQuestoinFlag, setCurrentQuestionFlag] = useState(true);
  const [currentEditedQuestionIndex, setCurrentEditedQuestionIndex] = useState(0);
  const [open, setOpen] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  console.log('Current Game', quiz);

  /**
   * Fetch all questions of current game as option to selector
   */
  const fetchQuestionsByID = () => {
    fetch(`http://localhost:${PORT_NUM}/admin/quiz/${gameId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log('Fetched res', res);
        setQuiz(res);
        setThumbnail(res.thumbnail);
        return res.questions;
      })
      .then(res => setQuestions(res))
      .catch(err => console.log(err));
  }

  // Fetch all questions at the beginning of rendering the page
  useEffect(() => {
    fetchQuestionsByID();
  }, []);

  /**
   * Change the form of selected question to update, return a component of
   * EditCard which displays information of the editable question
   *
   * @param {object} props
   */
  const CurrentEditedQuestion = props => {
    console.log(props.question);
    if (!currentQuestoinFlag) return null;
    return questions.length === 0 ?
      <Typography>There is no question in current game. Please add new questions.</Typography> :
      <EditCard game={quiz} gameId={gameId} questions={questions} index={currentEditedQuestionIndex} />
  }

  /**
   * Display all editable questions as set of buttons in current game,
   * each is clickable to change the EditCard with corresponding info
   * 
   * @param {object} props
   */
  const EditableQuestionList = props => {
    const contents = props.questions.map((question, index) => {
      return (
        <Link key={index} to={`/editGame/${gameId}/${question.questionId}`} style={{ textDecoration: 'none', color: 'grey' }}>
          <ListItem button onClick={event => showCurrentQuestion(index)}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary={`Question: ${question.questionId}`} />
          </ListItem>
        </Link>
      )
    })
    return (
      <div>
        <ListSubheader inset>Current Questions</ListSubheader>
        {contents}
      </div>
    )
  }

  /**
   * Update game by specify gameId, body of data should be new question list
   * @param {object} questionList 
   */
  const updateGame = (questionList) => {
    console.log('question list', questionList)
    fetch(`http://localhost:${PORT_NUM}/admin/quiz/${gameId}`, {
      method: 'PUT',
      body: JSON.stringify({
        "questions": questionList,
        "name": quiz.name,
        "thumbnail": thumbnail
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  /**
   * Encode image into base64 format and display below the the input to preview.
   * Justify the image is for question or the game thumbnail.
   * @param {file} img 
   * @param {string} type - speficy the image is for question or game
   */
  const previewImage = (img) => {
    const reader = new FileReader();
    reader.readAsDataURL(img.files[0]);
    reader.onloadend = () => {
      setThumbnail(reader.result)
    };
  }

  /**
   * Update src of thubmail
   * @param {object} event 
   */
  const addThumbnail = event => {
    event.preventDefault();
    updateGame(questions);
  }

  /**
   * A component to add or update thumbnail for the game
   */
  const AddThumbnail = () => {
    return thumbnailFlag ?
      (
        <form onSubmit={addThumbnail}>
          <h2>Add Thumbnail for Game</h2>
          <input type='file' onChange={e => previewImage(e.target)} /><br />
          {thumbnail !== '' ? <img src={thumbnail} style={{ width: '200px' }} /> : null}
          <input type="submit" value="Submit" />
        </form>
      ) : null;
  }


   // Clear token stored in redux and redirect to login page
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
   * Following three functions are toggle different components based on the 
   * item clicked by user in the left list.
   */
  const showAddNew = () => {
    setThumbnailFlag(false);
    setCurrentQuestionFlag(false);
    setAddFlag(true);
  }

  const showAddThumbnail = () => {
    setAddFlag(false);
    setCurrentQuestionFlag(false);
    setThumbnailFlag(true);
  }

  const showCurrentQuestion = index => {
    setCurrentEditedQuestionIndex(index);
    setAddFlag(false);
    setThumbnailFlag(false);
    setCurrentQuestionFlag(true);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Edit Your game
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><EditableQuestionList questions={questions} /></List>
        <Divider />
        <List>
          <ListSubheader inset>Function menu</ListSubheader>
          <ListItem button onClick={showAddNew}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Create New Question" />
          </ListItem>
          <ListItem button onClick={showAddThumbnail}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Add Thumbnail" />
          </ListItem>
          <ListItem button onClick={loginOut}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content} style={{ marginLeft: '30px' }}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <AddThumbnail />
            <AddNewQuestion game={quiz} gameId={gameId} questions={questions} updateGame={updateGame} show={addFlag} />
            <CurrentEditedQuestion question={questions[currentEditedQuestionIndex]} />
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
