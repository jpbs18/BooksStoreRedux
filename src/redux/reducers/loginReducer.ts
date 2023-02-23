import { LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, RESET_LOGIN, LOGIN_COOKIES } from "../actions/constants";
import { Action } from "../actions/types";

const initialState = {
  loading: false,
  error: null,
  user: null,
};

export const loginReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case LOGIN_USER_FAILURE:
      return {
        loading: false,
        error: action.payload,
        user: null,
      };

    case RESET_LOGIN:
      return {
        loading: false,
        error: null,
        user: null,
      };

    case LOGIN_COOKIES:
      return {
        loading: false,
        error: null,
        user: action.payload,
      };

    default:
      return state;
  }
};
