import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from '../actions/shared'
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import Login from "./Login";
import "../App.css"
import LoadingBar from "react-redux-loading-bar";
import ShowQuestion from "./ShowQuestion";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData())
  },[props]);

  return (
    <div>
      <LoadingBar />
        <Nav />
        {props.loading === true ? null : (
        <Routes>
          <Route path="/question/:id" element={ <ShowQuestion />} />
          <Route path="/login" element={ <Login /> } />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      )}
    </div>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return {
    login: authedUser,
  };
};

export default connect()(App);