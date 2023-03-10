import {User} from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
  authError: null;
}

export const initialState: State = {
  user: null,
  authError: null,
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate);

      return {
        ...state,
        user: user,
        authError: null,
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload
      };
    default:
      console.log('Defaulting Auth Action:');
      console.log(action);
      return state;
  }
}
