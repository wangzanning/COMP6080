import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

/**
 * Select one of the options from the dropdown to confirm the correct answer,
 * value of selector should be first element in answer list as there is only
 * one correct answer for single choice  questions
 */
export const SingleChoices = (props) => {
  const options = [];
  const handleUpdateAnswers = props.handleUpdateAnswers;
  const correctAnsIdx = props.answers.findIndex(answer => answer.correct === true);
  const [singleCorrect, setSingleCorrect] = useState(correctAnsIdx);
  
  /**
   * For single choice question, there is only one correct answer,
   * before update correct answer, reset correctness of all answer to be false
   * then update the correctness of selected answer to be true.
   * Function is called when handle single choice answer
   * @param {object} event 
   */
  const setSingleAnswer = (event, answers, handleUpdateAnswers) => {
    const correctIndex = parseInt(event.target.value);
    setSingleCorrect(correctIndex);
    answers.map(answer => answer.correct = false); // Reset all to false
    answers[correctIndex].correct = true; // Set single one as true
    handleUpdateAnswers(answers);
  }

  props.answers.map((answer, index) => {
    options.push(
      <FormControlLabel
        key={index}
        value={index}
        control={<Radio />}
        label={answer.content}
      />
    );
  });
  return <RadioGroup
    aria-label="single-choice-answers"
    name="single-choice"
    value={singleCorrect}
    onChange={event => setSingleAnswer(event, props.answers, handleUpdateAnswers)}>
    {options}
  </RadioGroup>;
}

/**
 * Given set of checkboxes to select multiple labels as correct answers for 
 * multiple choice questions. Once the checkbox is selected, add the answer
 * to the answer list.
 */
export const MultipleChoices = (props) => {
  const answers = props.answers;
  const handleUpdateAnswers = props.handleUpdateAnswers;

  /**
   * Handle the operation of check/uncheck to update correctness of answers.
   * Function is called when setting correct answers of multiple choice question.
   * @param {object} event 
   */
  const handleCheckBoxChange = (event, answers, handleUpdateAnswers) => {
    answers[event.target.value].correct = event.target.checked
    handleUpdateAnswers(answers);
  };

  const inputs = answers.map((answer, index) => {
    return (
      <FormControlLabel
        key={index}
        control={<Checkbox value={index} onChange={event => handleCheckBoxChange(event, answers, handleUpdateAnswers)} />}
        label={answer.content}
      />
    )
  });
  return <FormGroup>{inputs}</FormGroup>
}
