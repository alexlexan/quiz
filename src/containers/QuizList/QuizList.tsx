import React, { Component } from "react";
import classes from "./QuizList.module.sass";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/action/quiz";

export type QuizesArray = {
  id: string;
  name: string;
}[];

type QuizListProps = {
  quizes: QuizesArray;
  loading: boolean;
  fetchQuizes: () => Promise<void>;
};

class QuizList extends Component<QuizListProps> {
  renderQuizes() {
    return this.props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div className={classes.QuizListWrapper}>
          <h1>Список тестов</h1>

          {this.props.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
}

const mapDispatchToProps = {
  fetchQuizes,
};
export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
