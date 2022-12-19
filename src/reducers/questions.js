import { ADD_QUESTION, RECEIVE_QUESTIONS, UPDATE_QUESTION } from '../actions/questions';
import { addQuestionToUser } from '../actions/users';

// This is a reducer function for the 'questions' slice of the Redux store
export default function questions(state = {}, action) {
  // The switch statement checks the action type to determine how to update the state
  switch (action.type) {
    // If the action is of type RECEIVE_QUESTIONS, the state is updated with the questions from the action
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    // If the action is of type ADD_QUESTION, the state is updated with the new question from the action
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    // If the action is of type UPDATE_QUESTION, the state is updated with the new vote data for the specified question and answer
    case UPDATE_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser,
            ]),
          },
        },
      };
    // If the action type does not match any of the above cases, the state is returned unchanged
    default:
      return state;
  }
}
