import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from "./_DATA.js";

export function getInitialData () {
  return Promise.all([
    _getusers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

