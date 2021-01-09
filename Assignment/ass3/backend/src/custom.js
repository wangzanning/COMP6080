/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  // Remove correctness of the answer
  const options = question.answer.map(ans => {
    delete ans['correct']
    return ans
  });
  return {
    questionId: question.questionId,
    type: question.type,
    text: question.text,
    timeLimit: question.timeLimit,
    points: question.points,
    mediaType: question.mediaType,
    imgSrc: question.imgSrc,
    videoURL: question.videoURL,
    answer: options
  };
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  const answers = question.answer.filter(a => a.correct === true);
  const answerIds = answers.map(a => a.answerId);
  return answerIds;
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  return question.answer.map(a => a.answerId);
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.timeLimit;
};
