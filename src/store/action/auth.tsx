import axios from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionTypes";
import { AuthState } from "../reducers/auth";

type authData = {
  expiresIn: number;
  idToken: string;
  localId: string;
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type AuthActions = ReturnType<InferValueTypes<typeof actions>>;

export function auth(
  email: string,
  password: string,
  isLogin: boolean
): ThunkAction<Promise<void>, AuthState, unknown, AuthActions> {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDP0yExbNI70Pj7TY9xJWl9sDuYo7MXYFY";

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDP0yExbNI70Pj7TY9xJWl9sDuYo7MXYFY";
    }

    const responce = await axios.post(url, authData);
    const data: authData = responce.data;

    const expirationData = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("expirationDate", String(expirationData));

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  };
}

export function autoLogout(time: number) {
  return (dispatch: ThunkDispatch<AuthState, unknown, AuthActions>) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function autoLogin() {
  return (dispatch: ThunkDispatch<AuthState, unknown, AuthActions>) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationData = new Date(
        localStorage.getItem("expirationDate") as string
      );
      if (expirationData <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          autoLogout((expirationData.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT,
  } as const;
}

export function authSuccess(token: string) {
  return {
    type: AUTH_SUCCESS,
    token,
  } as const;
}

const actions = {
  logout,
  authSuccess,
};
