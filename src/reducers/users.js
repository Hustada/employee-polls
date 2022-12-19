import { RECEIVE_USERS, ADD_QUESTION_TO_USER, ADD_ANSWER_TO_USER } from '../actions/users';

// This is a reducer function for the 'users' slice of the Redux store
export default function users(state = {}, action) {
  // The switch statement checks the action type to determine how to update the state
  switch (action.type) {
    // If the action is of type RECEIVE_USERS, the state is updated with the users from the action
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      }
    // If the action is of type ADD_QUESTION_TO_USER, the state is updated to add the question to the user's list of questions
    case ADD_QUESTION_TO_USER:
      return {
        ...state,
        [ action.author ]: {
            ...state[ action.author ],
            questions: state[ action.author ].questions.concat(action.qid),
        },
      }
    // If the action is of type ADD_ANSWER_TO_USER, the state is updated to add the answer to the user's list of answers
    case ADD_ANSWER_TO_USER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[ action.authedUser ],
          answers: {
            ...state[ action.authedUser ].answers,
            [ action.qid ]: action.answer,
          }
        }
      }
    // If the action type does not match any of the above cases, the state is returned unchanged
    default:
      return state;
  }
}
