import { retryQuizType } from "../../store/action/quiz";
import { RouteComponentProps } from "react-router-dom";
export type ActiveQuizAnswer = {
  id: number;
  text: string;
};

export type QuizItemType = {
  answers: ActiveQuizAnswer[];
  id: number;
  question: string;
  rightAnswerId: number;
};

type MatchParams = {
  id: string;
};

export type QuizProps = {
  results: {
    [key: number]: string;
  };
  isFinished: boolean;
  activeQuestion: number;
  answerState: null | {
    [key: number]: "error" | "success";
  };
  quiz: QuizItemType[];
  loading: boolean;
  fetchQuizById: (quizId: string) => Promise<void>;
  quizAnswerClick: (answerId: number) => void;
  retryQuiz: () => retryQuizType;
} & RouteComponentProps<MatchParams>;
