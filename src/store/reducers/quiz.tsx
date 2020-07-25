import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from "../action/actionTypes";
import { QuizActions } from "../action/quiz";
import { QuizItemType } from "../../containers/Quiz/QuizType";
import { QuizesArray } from "../../containers/QuizList/QuizList";

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: (null as unknown) as QuizItemType[],
};

export type QuizState = {
  quizes: QuizesArray;
  loading: boolean;
  error: Event | null;
  results: {
    [key: number]: string;
  };
  isFinished: boolean;
  activeQuestion: number;
  answerState: null | {
    [key: number]: "error" | "success";
  };
  quiz: QuizItemType[];
};

export default function quizReducer(
  state: QuizState = initialState,
  action: QuizActions
): QuizState {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true,
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        activeQuestion: action.number,
      };
    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
      };
    default:
      return state;
  }
}
