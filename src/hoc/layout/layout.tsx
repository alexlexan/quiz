import React, { Component } from "react";
import classes from "./layout.module.sass";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import { connect } from "react-redux";
import { AppState } from "../../store/reducers/rootReducer";

type Props = {
  isAuthenticated: boolean;
  children: React.ReactNode;
};

type State = {
  menu: boolean;
};

class Layout extends Component<Props, State> {
  state = {
    menu: false,
  };
  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };
  menuCloseHandler = () => {
    this.setState({ menu: false });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Layout);
