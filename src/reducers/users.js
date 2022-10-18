import { RECEIVE_USERS, ADD_QUESTION_TO_USER } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      }
    case ADD_QUESTION_TO_USER:
      return {
        ...state,
        [ action.author ]: {
            ...state[ action.author ],
            questions: state[ action.author ]
        },
      }
    default:
      return state;
  }
}