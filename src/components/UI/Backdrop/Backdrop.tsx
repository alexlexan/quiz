import React from "react";
import classes from "./Backdrop.module.sass";

type Props = {
  onClick: () => void,
};

const Backdrop: React.FC<Props> = (props) => (
  <div className={classes.Backdrop} onClick={props.onClick}></div>
);

export default Backdrop;
