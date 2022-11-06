import { saveQuestion, _getUser, saveQuestionAnswer } from "../utils/api";
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);



describe('_getUser', () => {
  it('will return the user if the id and password if both are found', async () => {
    var userId = 'sarahedo';
    var password = 'password123';
    var result = await _getUser(userId, password);
      expect(result.id).toEqual(userId);
      expect(result.password).toEqual(password);
  });
});

describe('saveQuestion', () => {
  const author = "Author";
  const optionOneText = "Billy D Williams"
  const optionTwoText = "Lando"

  it('will throw an error if the wrong input in provided.', async () => {
      try {
          await saveQuestion({author})
      } catch (err) {
          expect(err).toEqual("Please provide optionOneText, optionTwoText, and author");
      }
  });

  it('will return question object', async () => {
    var result = await saveQuestion({ author, optionOneText, optionTwoText });
    expect(Object.keys(result)).toEqual(["id", "timestamp", "author", "optionOne", "optionTwo"]);
    expect(result.author).toEqual("Author");
    expect(result.optionOne.text).toEqual("Billy D Williams");
    expect(result.optionTwo.text).toEqual("Lando");
  });
});

describe('saveQuestionAnswer', () => {
  const authedUser = "tylermcginnis";
  const qid = "vthrdm985a262al8qx3do";
  const answers = "optionTwo";

  it('will throw an error if the wrong data is provided', async () => {
    try {
      await saveQuestionAnswer({answers})
    } catch (err) {
      expect(err).toEqual("Please provide authedUser, qid, and answer")
    }
  })

  it("Test that saveQuestionAnswer will return question object", async () => {
    const answerData = {
      authedUser: "sarahedo",
      qid: "xj352vofupe1dqz9emx13r",
      answer: "optionOne",
    };
    await expect(saveQuestionAnswer(answerData)).resolves.toEqual(true);
  });
})