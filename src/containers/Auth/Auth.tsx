import React, { Component, FormEvent } from "react";
import classes from "./Auth.module.sass";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import { auth } from "../../store/action/auth";
import { validateEmail } from "../../utils";
import {
  AuthProps,
  AuthState,
  AuthValidation,
  AuthFormControls,
  AuthFormControlsArray,
} from "./AuthType";

class Auth extends Component<AuthProps, AuthState> {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        errorMessage: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };
  rigisterHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
  };

  submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  validateControl(value: string, validation: AuthValidation) {
    if (!validation) return true;

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    controlName: keyof AuthFormControls
  ) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    (formControls as AuthFormControls)[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });
    this.setState({
      formControls,
      isFormValid,
    });
  };

  renderInputs() {
    return (Object.keys(this.state.formControls) as AuthFormControlsArray).map(
      (controlName, index) => {
        const control = this.state.formControls[controlName];
        return (
          <Input
            key={controlName + index}
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              this.onChangeHandler(event, controlName)
            }
          />
        );
      }
    );
  }

  render() {
    return (
      <div className={classes.Auth}>
        <h1>Авторизация</h1>
        <form onSubmit={this.submitHandler}>
          {this.renderInputs()}

          <Button
            type="success"
            onClick={this.loginHandler}
            disabled={!this.state.isFormValid}
          >
            Войти
          </Button>
          <Button
            type="primary"
            onClick={this.rigisterHandler}
            disabled={!this.state.isFormValid}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  auth,
};
export default connect(null, mapDispatchToProps)(Auth);
