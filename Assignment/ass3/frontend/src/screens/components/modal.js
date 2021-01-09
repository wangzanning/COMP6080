import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const PopUp = (props) => {
  const classes = useStyles();
  const close = event => props.close && props.close(event);
  const gameId = props.gameId;

  if (!props.show) return null;
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.show}
        onClose={e => close(e)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.show}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{props.content}</h2>
            {props.operation === 'Yes' ?
              <Link to={`/result/${props.sessionId}`}>
                <Button variant="outlined" color="primary">Yes</Button>
              </Link> :
              <div>
                <Link to={`playJoin/${gameId}`}>
                  <Button variant="outlined" color="primary">Join Game</Button>
                </Link>
                <Button variant="outlined" color="primary" onClick={e => props.copy(e)}>{props.operation}</Button>
              </div>
            }
            <Button variant="outlined" color="primary" onClick={e => close(e)}>Close</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );

}

export default PopUp;