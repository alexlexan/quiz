import React, { Component, FormEvent } from "react";
import classes from "./QuizCreator.module.sass";
import Button from "../../components/UI/Button/Button";
import { validate, validateForm } from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import { connect } from "react-redux";
import {
  createQuizQuestion,
  finishCreateQuiz,
  resetQuizCreation,
  resetQuizQuestion,
  changeQuizQuestion,
  changeQuizQuestionAnswer,
} from "../../store/action/create";
import {
  CreateState,
  formControlsType,
  createControl,
} from "../../store/reducers/create";
import { AppState } from "../../store/reducers/rootReducer";

type QuizCreatorProps = {
  createQuizQuestion: typeof createQuizQuestion;
  finishCreateQuiz: () => void;
  resetQuizCreation: typeof resetQuizCreation;
  resetQuizQuestion: typeof resetQuizQuestion;
  changeQuizQuestionAnswer: typeof changeQuizQuestionAnswer;
  changeQuizQuestion: typeof changeQuizQuestion;
} & CreateState;

class QuizCreator extends Component<QuizCreatorProps> {
  submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  addQuestionHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.props.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.props.rightAnswerId,
      answers: [
        { text: option1.value, id: this.props.formControls.option1.id },
        { text: option2.value, id: this.props.formControls.option2.id },
        { text: option3.value, id: this.props.formControls.option3.id },
        { text: option4.value, id: this.props.formControls.option4.id },
      ],
    };

    this.props.createQuizQuestion(questionItem);

    this.props.resetQuizQuestion();
  };

  createQuizHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    this.props.resetQuizQuestion();
    this.props.finishCreateQuiz();
  };

  changeHandler = (value: string, controlName: keyof formControlsType) => {
    const formControls = { ...this.props.formControls };
    const control = { ...formControls[controlName] };

    control.touch = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    (formControls[controlName] as createControl) = control;

    this.props.changeQuizQuestion(formControls, validateForm(formControls));
  };

  renderControls() {
    return (Object.keys(this.props.formControls) as Array<
      keyof formControlsType
    >).map((controlName, index) => {
      const control = this.props.formControls[controlName];

      return (
        <React.Fragment key={controlName}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touch}
            errorMessage={control.errorMessage}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              this.changeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  }

  selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.changeQuizQuestionAnswer(+event.target.value);
  };

  componentWillUnmount() {
    this.props.resetQuizCreation();
  }

  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.props.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            {select}
            <Button
              type={"primary"}
              onClick={this.addQuestionHandler}
              disabled={!this.props.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type={"success"}
              onClick={this.createQuizHandler}
              disabled={!this.props.quiz.length}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    quiz: state.create.quiz,
    isFormValid: state.create.isFormValid,
    rightAnswerId: state.create.rightAnswerId,
    formControls: state.create.formControls,
  };
}
const mapDispatchToProps = {
  createQuizQuestion,
  finishCreateQuiz,
  resetQuizCreation,
  resetQuizQuestion,
  changeQuizQuestionAnswer,
  changeQuizQuestion,
};
export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
