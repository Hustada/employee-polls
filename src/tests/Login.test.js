import React from "react";
import { Provider } from "react-redux";
import { screen, render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import Login from "../components/Login";
import reducer from '../reducers';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("NewQuestion", () => {
  let mockedStore;

  beforeEach(() => {
    mockedStore = mockStore({
      users: {
        franciscofrias: {
          id: "markhustad",
          password: "lv426",
          name: "Mark Hustad",
          avatarURL:
            "https://i.pravatar.cc/150?img=3",
          answers: {},
          questions: [],
        },
      },
      authedUser: "markhustad",
    });
  });

  it("should login with correct credentials", () => {
    const component = render(
      <MemoryRouter>
        <Provider store={mockedStore}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    const loginButton = component.getByTestId('login-btn');
    fireEvent.click(loginButton);
    const loginError = component.getByTestId('login-error');
    expect(loginError).toBeInTheDocument();
  });
});