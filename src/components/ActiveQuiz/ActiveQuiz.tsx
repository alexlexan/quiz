import React from "react";
import classes from "./ActiveQuiz.module.sass";
import AnswersList from "./AnswersList/AnswersList";
import { ActiveQuizAnswer } from "../../containers/Quiz/QuizType";

export type ActiveQuizProps = {
  answers: ActiveQuizAnswer[];
  question: string;
  onAnswerClick(answerId: number): void;
  quizLength: number;
  answerNumber: number;
  state: null | {
    [key: number]: "error" | "success";
  };
};

const ActiveQuiz: React.FC<ActiveQuizProps> = (props) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{props.answerNumber}.</strong>&nbsp;
        {props.question}
      </span>

      <small>
        {props.answerNumber} из {props.quizLength}
      </small>
    </p>

    <AnswersList
      state={props.state}
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
    />
  </div>
);

export default ActiveQuiz;
