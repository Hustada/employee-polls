import { ADD_QUESTION, RECEIVE_QUESTIONS, UPDATE_QUESTION } from '../actions/questions';


export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        ...questions,
        [action.question.id]: action.question,
      };
    default:
      return state;
  }
}
