import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../store/action/auth";

type LogoutProps = {
  logout: typeof logout;
};

class Logout extends Component<LogoutProps> {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <Redirect to={"/"} />;
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Logout);
