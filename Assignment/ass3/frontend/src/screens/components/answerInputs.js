import React from 'react';
import Input from '@material-ui/core/Input';

/**
 * Set of input as a component
 */
const AnswerInputs = (props) => {

  const answers = props.answers;
  const handleUpdateAnswer = props.handleUpdateAnswer;

  /**
   * Update value of specific input by index
   *
   * @param {objcet} event
   * @param {number} index
   */
  const updateAnswersContent = (event, index) => {
    answers[index].content = event.target.value;
    handleUpdateAnswer(answers);
  }
  return (
    <div>
      {answers.map((answer, index) => {
        return (
          <div key={index}>
            <label>{index + 1}
              <Input type="text"
                     placeholder={answer.content}
                     onChange={event => updateAnswersContent(event, index)} inputProps={{'aria-label': 'description'}}/>
            </label>
          </div>
        )
      })
      }
    </div>
  )
}

export default AnswerInputs;