import React from "react";
import classes from "./AnswerItem.module.sass";
import { ActiveQuizAnswer } from "../../../../containers/Quiz/QuizType";

type AnswerItemProps = {
  answer: ActiveQuizAnswer;
  onAnswerClick(answerId: number): void;
  state: "error" | "success" | null;
};

const AnswerItem: React.FC<AnswerItemProps> = (props) => {
  const cls = [classes.AnswerItem];

  if (props.state) {
    cls.push(classes[props.state]);
  }

  return (
    <li
      className={cls.join(" ")}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  );
};

export default AnswerItem;
