import {
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION,
  RESET_QUIZ_QUESTION,
  CHANGE_QUIZ_QUESTION,
  CHANGE_QUIZ_QUESTION_ANSWER,
} from "./actionTypes";
import axios from "axios";
import { AppState } from "../reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { CreateState, formControlsType } from "../reducers/create";
import { QuizItemType } from "../../containers/Quiz/QuizType";

export function createQuizQuestion(item: QuizItemType) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  } as const;
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION,
  } as const;
}

export function resetQuizQuestion() {
  return {
    type: RESET_QUIZ_QUESTION,
  } as const;
}

export function changeQuizQuestion(
  formControls: formControlsType,
  isFormValid: boolean
) {
  return {
    type: CHANGE_QUIZ_QUESTION,
    formControls,
    isFormValid,
  } as const;
}

export function changeQuizQuestionAnswer(rightAnswerId: number) {
  return {
    type: CHANGE_QUIZ_QUESTION_ANSWER,
    rightAnswerId,
  } as const;
}

export function finishCreateQuiz() {
  return async (
    dispatch: ThunkDispatch<CreateState, unknown, CreateActions>,
    getState: () => AppState
  ) => {
    await axios.post(
      "https://react-quiz-2cfa5.firebaseio.com/quizes.json",
      getState().create.quiz
    );
    dispatch(resetQuizCreation());
  };
}

const actions = {
  createQuizQuestion,
  resetQuizCreation,
  resetQuizQuestion,
  changeQuizQuestion,
  changeQuizQuestionAnswer,
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type CreateActions = ReturnType<InferValueTypes<typeof actions>>;
