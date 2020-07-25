import React from "react";
import classes from "./Input.module.sass";

function isInvalid({
  valid,
  touched,
  shouldValidate,
}: {
  valid: Boolean;
  touched: Boolean;
  shouldValidate: Boolean;
}) {
  return !valid && shouldValidate && touched;
}

type Props = {
  type?: string;
  valid: Boolean;
  touched: Boolean;
  shouldValidate: Boolean;
  value: string;
  label: string;
  errorMessage: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = (props) => {
  const inputType = props.type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) ? (
        <span>{props.errorMessage || "Введите верное значение"}</span>
      ) : null}
    </div>
  );
};

export default Input;
