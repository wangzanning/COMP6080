import React, {useState} from 'react';
import {PORT_NUM} from './action';
import { useHistory} from 'react-router-dom';
import PopUp from './modal';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import copy from 'copy-to-clipboard';

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

const GameCard = (props) => {
  const token = props.token;
  const id = props.id;
  const [buttonText, setButtonText] = useState('Start Game');
  const [sessionId, setSessionId] = useState(0);
  const [visible, setVisible] = useState(false);
  const [stopModalVisible, setStopModalVisible] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  /**
   * Determine the state of game, i.e. if the game is starting
   * to set the text of button
   */
  React.useEffect(() => {
    getQuizInfo()
      .then(res => {
        if (res.active !== null) { // Game is in processsing
          setButtonText('Stop Game');
          setSessionId(res.active);
        }
      })
  }, []);

  /**
   * Handle the event of deleting
   */
  const deleteGame = () => {
    const para = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    fetch(`http://localhost:${PORT_NUM}/admin/quiz/${id}`, para)
      .then(res => res.json())
      .then(res => console.log('Delete game response', res));
  }

  /**
   * Start a game to get the sessionId in active
   * Or stop a game by checking text of button to determine the status
   */
  const toggleGameStatus = () => {

    if (buttonText === 'Start Game') {
      setButtonText('Stop Game');
      fetch(`http://localhost:${PORT_NUM}/admin/quiz/${id}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(res => {
          console.log('Start game response', res);
          getQuizInfo()
            .then(res => {
              setSessionId(res.active);
              setVisible(true);
              console.log('Session ID', res.active);
            });
        })
        .then(res => {
          fetch(`http://localhost:${PORT_NUM}/admin/quiz/${id}/advance`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
            .then(res => res.json())
            .then(res => console.log('Advanced game resposne', res));
        })
    } else { // Stop the game
      setButtonText('Start Game');
      setStopModalVisible(true);
      // Request to stop
      fetch(`http://localhost:${PORT_NUM}/admin/quiz/${id}/end`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(res => {
          console.log('Stop Game Response', res)
        });
    }

  }

  /**
   * Fetch info of quiz by quizId and get sessionId
   */
  const getQuizInfo = () => {
    return fetch(`http://localhost:${PORT_NUM}/admin/quiz/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json());
  }

  const showStartModal = e => {
    setVisible(!visible);
  }

  const showStopModal = e => {
    setStopModalVisible(!stopModalVisible);
  }

  /**
   * When this item is clicked, a direct URL is copied to the clipboard.
   * When going to this URL, the users should be given play screen (described in 2.4)
   * with the session code already pre-populated.
   * @param {object} event
   */
  const copyLink = event => {
    // TODO: GANEM ID NEED TO BE SPECIFIED IN 2.4
    const url = `http://localhost:${window.location.port}/playJoin/${props.gameId}/${sessionId}`;
    copy(url)// ? console.log(`Copy ${url} success!`) : console.log(`Copy ${url} fail!`);
  };

  return (
    <Grid item key={props.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          componnet="img"
          alt="Image of the Game"
          className={classes.cardMedia}
          image={props.src}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography>
            <strong>Number of Questions: </strong>{props.numQuestions}
          </Typography>
          <Typography>
            <strong>Duration: </strong>{props.time} Seconds
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => toggleGameStatus(props.id)}>
            {buttonText}
          </Button>
          {buttonText === 'Stop Game' ?
            <PopUp
              show={visible}
              close={showStartModal}
              content={`Session ID is ${sessionId}`}
              operation={'Copy Link'}
              copy={copyLink}
              sessionId={sessionId}
              gameId={props.gameId}
            /> :
            <PopUp
              show={stopModalVisible}
              close={showStopModal}
              content={'Would you like to view the results?'}
              operation={'Yes'}
              sessionId={sessionId}
            />}
          <Button size="small" color="primary" onClick={() => history.push(`/editGame/${props.id}`)}>
            Edit
          </Button>
          <Button size="small" color="primary" onClick={() => deleteGame(props.id)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>

  );
}

export default GameCard;