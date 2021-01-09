import React, { useState } from 'react';
// import { PORT_NUM } from './action';
// import { useSelector } from 'react-redux';
import AnswerInputs from './answerInputs';
import { SingleChoices, MultipleChoices } from './options';
import Input from '@material-ui/core/Input';


const AddNewQuestion = (props) => {
  // const token = useSelector(state => state.token).token;
  // const gameId = props.gameId;
  const questions = props.questions;
  // const game = props.game;
  const updateGame = props.updateGame;
  const show = props.show;
  const [questionType, setQuestionType] = useState('single');
  const [questionText, setQuestionText] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);
  const [points, setPoints] = useState(0);
  const [answers, setAnswers] = useState([{
    answerId: 1, // Unique answerId for each answer
    content: 'Please set first answer', // Content text of the answer
    correct: false // If it is correct answer
  },
  {
    answerId: 2,
    content: 'Please set second answer',
    correct: false
  }]); // Should have at least two answers, stored as list of JSON
  const [attachmentType, setAttachmentType] = useState('Image');
  const [videoURL, setVideoURL] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  /**
   * Format new question, schema could be adjusted
   * @param {object} event 
   */
  const addNewQuestion = event => {
    event.preventDefault();

    const addedQuestion = {
      questionId: Math.floor(Math.random() * 1000000000),
      type: questionType,
      text: questionText,
      timeLimit: timeLimit,
      points: points,
      answer: answers,
      mediaType: attachmentType,
      imgSrc: imgSrc,
      videoURL: videoURL
    };
    const newQuestions = [...questions, addedQuestion];
    console.log(newQuestions)
    updateGame(newQuestions);
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
      setImgSrc(reader.result)
    };
  }


  return show ? (
    <div>
      <form onSubmit={addNewQuestion}>

        <h1>Add a New Question</h1><br />

        <label>Question Text: </label><Input type='text' onChange={e => setQuestionText(e.target.value)} inputProps={{ 'aria-label': 'description' }} /> <br />

        <label>Time Required: </label> <Input type='number' onChange={e => setTimeLimit(e.target.value)} inputProps={{ 'aria-label': 'description' }} /> <label>Seconds</label> <br />

        <label>Point Bonus: </label><Input type='number' onChange={e => setPoints(e.target.value)} inputProps={{ 'aria-label': 'description' }}/> <br />
        
        <label>Please Select Attachment Type</label>
        <select onChange={e => setAttachmentType(e.target.value)}>
          <option value='Image'>Image</option>
          <option value='Video'>Video</option>
        </select> <br />

        <label>Upload Attachment</label>
        {attachmentType === 'Image' ?
          <div>
            <Input type='file' onChange={e => previewImage(e.target)} inputProps={{ 'aria-label': 'description' }} /><br />
            {imgSrc !== '' ? <img src={imgSrc} style={{ width: '200px' }} /> : null}
          </div> :
          <Input type='text' onChange={e => setVideoURL(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
        }
        <br />

        <AnswerInputs answers={answers} handleUpdateAnswer={setAnswers} />

        <label>Question Type: </label>
        <select onChange={e => setQuestionType(e.target.value)}>
          <option value='single'>Single choice</option>
          <option value='multipe'>Multiple choice</option>
        </select> <br />

        <label>Correct Answer(s)</label>
        {questionType === 'single' ? <SingleChoices answers={answers} handleUpdateAnswers={setAnswers} /> : <MultipleChoices answers={answers} handleUpdateAnswers={setAnswers} />}<br />

        <input type="reset" value="CLEAR" style={{backgroundColor:'rgb(55,72,172)', color:'rgb(255,255,255)', borderRadius:'5px', margin:'5px', padding:'5px'}}/>
        <input type="submit" value="Submit" style={{backgroundColor:'rgb(55,72,172)', color:'rgb(255,255,255)', borderRadius:'5px', margin:'5px', padding:'5px'}}/>
      </form>
    </div>

  ) : null;
}

export default AddNewQuestion;