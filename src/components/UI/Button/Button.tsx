import React from "react";
import classes from "./Button.module.sass";

type Props = {
  type: string;
  disabled?: boolean;
  onClick?: (event) => void;
};

const Button: React.FC<Props> = (props) => {
  const cls = [classes.Button, classes[props.type]];

  return (
    <button
      onClick={props.onClick}
      className={cls.join(" ")}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
