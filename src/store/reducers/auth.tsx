import { AUTH_SUCCESS, AUTH_LOGOUT } from "../action/actionTypes";
import { AuthActions } from "../action/auth";

const initialState = {
  token: null,
};

export type AuthState = {
  token: null | string;
};

export default function authReducer(
  state: AuthState = initialState,
  action: AuthActions
) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}
