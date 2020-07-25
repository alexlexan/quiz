import React from "react";
import classes from "./Loader.module.sass";

const Loader: React.FC = () => (
  <div className={classes.center}>
    <div className={classes.Loader}>
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
