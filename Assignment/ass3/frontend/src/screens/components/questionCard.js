import React from 'react';
import { useSelector } from 'react-redux';
import { PORT_NUM } from './action';
import { SingleChoices, MultipleChoices } from './options';
import { useParams } from 'react-router-dom';

/**
 * Display each editable question with question text, 
 * video or image and all of their options
 * 
 * @param {object} question - a question
 */
const QuestionCard = (props) => {
  const playerId = useParams().playerId;
  const question = props.question;
  const token = useSelector(state => state.token).token;
  console.log(question);

  /**
   * Sent the answer Ids to server the moment the user starts making selections
   * 
   * @param {object} answers - array of answers
   */
  const submitAnswer = (answers) => {
    const selectedAnswer = answers.filter(answer => answer.correct === true);
    const answerIds = selectedAnswer.map(answer => answer.answerId);
    console.log(answerIds)
    fetch(`http://localhost:${PORT_NUM}/play/${playerId}/answer`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "answerIds": answerIds
      })
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <div style={{margin: 'auto', padding: '50px'}}>
      <h1>{question.text}</h1>
      <div>Points: {question.points}</div>
      {question.mediaType === 'Image' ?
        <img src={question.imgSrc} style={{ width: '200px' }} /> :
        <p>{question.videoURL}</p>}
      {question.type === 'single' ?
        <SingleChoices answers={question.answer} handleUpdateAnswers={submitAnswer} /> :
        <MultipleChoices answers={question.answer} handleUpdateAnswers={submitAnswer} />}
    </div>
  );
}


export default QuestionCard;