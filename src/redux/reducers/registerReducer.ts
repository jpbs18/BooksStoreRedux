import { Action } from "../actions/types";
import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, RESET_REGISTER } from "../actions/constants";

const initialState = {
  loading: false,
  error: null,
  user: null,
};

export const registerReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_USER_SUCCESS:
      return {
        error: null,
        loading: false,
        user: action.payload,
      };

    case REGISTER_USER_FAILURE:
      return {
        loading: false,
        user: null,
        error: action.payload,
      };

    case RESET_REGISTER:
      return {
        loading: false,
        error: null,
        user: null,
      };

    default:
      return state;
  }
};
