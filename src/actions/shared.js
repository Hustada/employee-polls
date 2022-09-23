import { getInitialData }  from "../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";

const AUTHED_ID = "markhustad";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
    });
  };
}