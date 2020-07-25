import React from "react";
import classes from "./AnswersList.module.sass";
import AnswerItem from "./AnswerItem/AnswerItem";
import { ActiveQuizProps } from "../ActiveQuiz";

type AnswersListProps = Pick<
  ActiveQuizProps,
  "answers" | "onAnswerClick" | "state"
>;

const AnswersList: React.FC<AnswersListProps> = (props) => (
  <ul className={classes.AnswersList}>
    {props.answers.map((answer, index) => {
      return (
        <AnswerItem
          state={props.state ? props.state[answer.id] : null}
          key={index}
          answer={answer}
          onAnswerClick={props.onAnswerClick}
        />
      );
    })}
  </ul>
);

export default AnswersList;
