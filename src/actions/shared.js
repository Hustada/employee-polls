import { getInitialData, saveQuestion }  from "../utils/api";
import { receiveQuestions, addQuestion } from "./questions";
import { receiveUsers, addQuestionToUser } from "./users";
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
  return (dispatch, getState) => {

    dispatch(showLoading());
    return saveQuestion(question)
      .then((question) => {
          dispatch(addQuestion(question));
          dispatch(addQuestionToUser({
              qid: question.id,
              author: question.author,
          }));
      })
      .then(() => dispatch(hideLoading()));;
  };
}