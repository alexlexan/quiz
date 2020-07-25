import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from "./actionTypes";
import { ThunkDispatch } from "redux-thunk";
import { QuizState } from "../reducers/quiz";
import { AppState } from "../reducers/rootReducer";
import { QuizItemType } from "../../containers/Quiz/QuizType";

export function fetchQuizes() {
  return async (dispatch: ThunkDispatch<QuizState, unknown, QuizActions>) => {
    dispatch(fetchQuizesStart());
    try {
      const responce = await axios.get("/quizes.json");
      const quizes: Array<{}> = [];
      Object.keys(responce.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест #${index + 1}`,
        });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  } as const;
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  } as const;
}

export function fetchQuizesError(e: Event) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e,
  } as const;
}

export function fetchQuizById(quizId: string) {
  return async (dispatch: ThunkDispatch<QuizState, unknown, QuizActions>) => {
    dispatch(fetchQuizesStart());

    try {
      const responce = await axios.get(`/quizes/${quizId}.json`);
      const quiz: QuizItemType[] = responce.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizSuccess(quiz: QuizItemType[]) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  } as const;
}

export function quizSetState(
  answerState: {
    [key: number]: "error" | "success";
  },
  results: {
    [key: number]: string;
  }
) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  } as const;
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  } as const;
}

export function quizNextQuiestion(number: number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  } as const;
}
export function quizAnswerClick(answerId: number) {
  return (
    dispatch: ThunkDispatch<QuizState, unknown, QuizActions>,
    getState: () => AppState
  ) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === "success") return;
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }

      dispatch(quizSetState({ [answerId]: "success" }, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuiestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 500);
    } else {
      results[question.id] = "error";
      dispatch(quizSetState({ [answerId]: "error" }, results));
    }
  };
}

function isQuizFinished(state: QuizState) {
  return state.activeQuestion + 1 === state.quiz.length;
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  } as const;
}

const actions = {
  retryQuiz,
  quizNextQuiestion,
  finishQuiz,
  fetchQuizesStart,
  fetchQuizesError,
  fetchQuizesSuccess,
  fetchQuizSuccess,
  quizSetState,
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type QuizActions = ReturnType<InferValueTypes<typeof actions>>;

export type quizAnswerClickType = ReturnType<typeof quizAnswerClick>;
export type retryQuizType = ReturnType<typeof retryQuiz>;
