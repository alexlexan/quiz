import {
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION,
  RESET_QUIZ_QUESTION,
  CHANGE_QUIZ_QUESTION,
  CHANGE_QUIZ_QUESTION_ANSWER,
} from "../action/actionTypes";
import { createControl } from "../../form/formFramework";
import { CreateActions } from "../action/create";
import { QuizItemType } from "../../containers/Quiz/QuizType";

function createOptionControl(number: number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      id: number,
      errorMessage: "Значение не может быть пустым",
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

const newFormControls = createFormControls();

export type formControlsType = typeof newFormControls;
type createQuestionControl = typeof newFormControls.question;
export type createControl = typeof createOptionControl | createQuestionControl;

const initialState = {
  quiz: [],
  isFormValid: false,
  rightAnswerId: 1,
  formControls: newFormControls,
};

export type CreateState = {
  quiz: QuizItemType[];
  isFormValid: boolean;
  rightAnswerId: number;
  formControls: formControlsType;
};

export default function createReducer(
  state: CreateState = initialState,
  action: CreateActions
): CreateState {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item],
      };
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quiz: [],
      };
    case RESET_QUIZ_QUESTION:
      return {
        ...state,
        isFormValid: false,
        rightAnswerId: 1,
        formControls: newFormControls,
      };
    case CHANGE_QUIZ_QUESTION:
      return {
        ...state,
        isFormValid: action.isFormValid,
        formControls: action.formControls,
      };
    case CHANGE_QUIZ_QUESTION_ANSWER:
      return {
        ...state,
        rightAnswerId: action.rightAnswerId,
      };
    default:
      return state;
  }
}
