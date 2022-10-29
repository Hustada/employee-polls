import { getInitialData, saveQuestion, saveQuestionAnswer }  from "../utils/api";
import { receiveQuestions, addQuestion, updateQuestion } from "./questions";
import { receiveUsers, addQuestionToUser, addAnswerToUser } from "./users";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions, authedUser }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function handleAddQuestion(question) {
  return (dispatch) => {

    dispatch(showLoading());
    return saveQuestion(question)
      .then((question) => {
          dispatch(addQuestion(question));
          dispatch(addQuestionToUser({
              qid: question.id,
              author: question.author,
          }));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function handleQuestionAnswer(selectedAnswer) {
 return (dispatch) => {
    return saveQuestionAnswer(selectedAnswer).then((res) => {
      console.log(selectedAnswer.answer);
      dispatch(updateQuestion(selectedAnswer));
      dispatch(addAnswerToUser(selectedAnswer));
    })
  };
}