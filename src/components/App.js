import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from '../actions/shared'
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import "../App.css"
import LoadingBar from "react-redux-loading-bar";
import ShowQuestion from "./ShowQuestion";
import LeaderBoard from "./LeaderBoard";

const App = ({dispatch, authedUser, loading}) => {
  useEffect(() => {
    dispatch(handleInitialData())
  },[dispatch]);

  return (
    <div>
     {authedUser === null ? (
        <Login />
      ) : (
        <div>
        <LoadingBar />
          <Nav />
            {loading === true ? null : (
          <Routes>
            <Route path="/questions/:id" element={ <ShowQuestion />} />
            <Route path="/home" element={<Home />} />
            <Route path="/new" element={<NewQuestion />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
          </Routes>
            )}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default (connect(mapStateToProps)(App));