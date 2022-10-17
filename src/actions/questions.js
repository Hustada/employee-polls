import { saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { addQuestionToUser } from './users';

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const UPDATE_QUESTION = "UPDATE_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function updateQuestion(user, questionId, option) {
  return {
    type: UPDATE_QUESTION,
    user,
    questionId,
    option,
  };
}

export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return saveQuestion(question)
      .then((question) => {
          dispatch(addQuestion(question));
          dispatch(addQuestionToUser({
              qid: question.id,
              author: authedUser.name,
          }));
      })
      .then(() => dispatch(hideLoading()));;
  };
}