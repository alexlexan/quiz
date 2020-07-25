import React, { Component } from "react";
import Layout from "./hoc/layout/layout";
import Quiz from "./containers/Quiz/Quiz";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import QuizList from "./containers/QuizList/QuizList";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import { connect } from "react-redux";
import Logout from "./components/Logout/Logout";
import { autoLogin } from "./store/action/auth";
import { AppState } from "./store/reducers/rootReducer";

type Props = {
  autoLogin: () => void;
  isAuthenticated: boolean;
} & RouteComponentProps;
type State = {};
class App extends Component<Props, State> {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

function mapStateToProps(state: AppState) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

const mapDispatchToProps = {
  autoLogin,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
