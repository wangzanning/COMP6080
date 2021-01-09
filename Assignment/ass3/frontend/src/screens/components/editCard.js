import React, { useState } from 'react';
import {PORT_NUM} from './action';
import {useSelector} from 'react-redux';
import AnswerInputs from './answerInputs';
import {SingleChoices, MultipleChoices} from './options';
import Input from '@material-ui/core/Input';


/**
 * Toggle the edition form for the clicked question with following editable components:
 *
 * The question type (multiple choice, single choice)
 * The question itself (as a string)
 * Time limit that users have to answer the question
 * Points for how much the question is worth
 * The ability to optionally attach a URL to a youtube video, or upload a photo, to enhance the question being asked).
 * Anywhere between 2 and 6 answers, that each contain the answer as a string
 */
const EditCard = (props) => {
  const token = useSelector(state => state.token).token;
  const gameId = props.gameId;
  const questions = props.questions;
  const game = props.game;
  const index = props.index;
  const currentQuestion = questions[index];
  const [questionType, setQuestionType] = useState(currentQuestion.type);
  const [questionText, setQuestionText] = useState(currentQuestion.text);
  const [timeLimit, setTimeLimit] = useState(currentQuestion.timeLimit);
  const [points, setPoints] = useState(currentQuestion.points);
  const [answers, setAnswers] = useState(currentQuestion.answer); // Could have multiple answers, stored as list
  const [attachmentType, setAttachmentType] = useState(currentQuestion.mediaType);
  const [videoURL, setVideoURL] = useState(currentQuestion.videoURL);
  const [imgSrc, setImgSrc] = useState(currentQuestion.imgSrc);

  /**
   * Update game by specify gameId, body of data should be new question list
   * @param {object} questionList
   */
  const updateGame = (questionList, gameName = game.name, thumbnail = game.thumbnail) => {
    console.log('question list', questionList)
    fetch(`http://localhost:${PORT_NUM}/admin/quiz/${gameId}`, {
      method: 'PUT',
      body: JSON.stringify({
        "questions": questionList,
        "name": gameName,
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
   * Construct new JSON object of question with updated values,
   * questionId should not be chagned
   * @param {object} event
   */
  const editQuestion = event => {
    event.preventDefault();

    const editedQuestion = {
      questionId: currentQuestion.questionId,
      type: questionType,
      text: questionText,
      timeLimit: timeLimit,
      points: points,
      answer: answers,
      mediaType: attachmentType,
      imgSrc: imgSrc,
      videoURL: videoURL
    };
    questions[index] = editedQuestion;
    updateGame(questions);
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
    reader.onloadend = () => setImgSrc(reader.result);
  }

  /**
   * Delete question by specifying the index in the question list
   *
   * @param {object} event
   */
  const deleteQuestion = (event) => {
    questions.splice(index, 1);
    updateGame(questions);
  }

  return (
    <div>
      <form onSubmit={editQuestion}>

        <h1>Edit {currentQuestion.text}</h1><br/>

        <label>Question Text: </label>
        <Input type='text' value={questionText} onChange={e => setQuestionText(e.target.value)}
               inputProps={{'aria-label': 'description'}}/> <br/>

        <label>Time Required: </label>
        <Input type='number' value={timeLimit} onChange={e => setTimeLimit(e.target.value)}
               inputProps={{'aria-label': 'description'}}/> <label>Seconds</label> <br/>

        <label>Point Bonus: </label>
        <Input type='number' value={points} onChange={e => setPoints(e.target.value)}
               inputProps={{'aria-label': 'description'}}/> <br/>

        <label>Please Select Attachment Type</label>
        <select defaultValue={attachmentType} onChange={e => setAttachmentType(e.target.value)}>
          <option value='Image'>Image</option>
          <option value='Video'>Video</option>
        </select> <br/>

        <label>Upload Attachment</label>
        {attachmentType === 'Image' ?
          <div>
            <Input type='file' onChange={e => previewImage(e.target, 'question')}
                   inputProps={{'aria-label': 'description'}}/><br/>
            {imgSrc !== '' ? <img src={imgSrc} style={{width: '200px'}}/> : null}
          </div> :
          <div>
            <Input type='text' onChange={e => setVideoURL(e.target.value)}
                   inputProps={{'aria-label': 'description'}}/><br/>
            {videoURL !== '' ?
              <iframe
                src={videoURL}
                frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
              /> : null}
          </div>
        }
        <br/>

        <div>Update your answers</div>
        <AnswerInputs answers={answers} handleUpdateAnswer={setAnswers}/>

        <label>Question Type: </label>
        <select onChange={e => setQuestionType(e.target.value)} defaultValue={currentQuestion.type}>
          <option value='single'>Single choice</option>
          <option value='multipe'>Multiple choice</option>
        </select> <br/>

        <label>Correct Answer(s)</label>
        {questionType === 'single' ?
          <SingleChoices answers={answers} handleUpdateAnswers={setAnswers}/> :
          <MultipleChoices answers={answers} handleUpdateAnswers={setAnswers}/>}<br/>
        <input type="reset" value="CLEAR" style={{
          backgroundColor: 'rgb(55,72,172)',
          color: 'rgb(255,255,255)',
          borderRadius: '5px',
          margin: '5px',
          padding: '5px'
        }}/>
        <input type="submit" value="Submit" style={{
          backgroundColor: 'rgb(55,72,172)',
          color: 'rgb(255,255,255)',
          borderRadius: '5px',
          margin: '5px',
          padding: '5px'
        }}/>

      </form>
      <button onClick={e => deleteQuestion(e)} style={{
        backgroundColor: 'rgb(55,72,172)',
        color: 'rgb(255,255,255)',
        borderRadius: '5px',
        margin: '5px',
        padding: '5px'
      }}>Delete Question
      </button>
    </div>
  );
}

export default EditCard;