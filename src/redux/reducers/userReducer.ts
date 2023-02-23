import { USER_UPDATE_FAILURE, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../actions/constants";
import { Action } from "../actions/types";

const initialState = {
  updateLoading: false,
  updateError: null,
  updateUser: null,
};

export const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        updateLoading: true,
      };

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateUser: action.payload,
      };

    case USER_UPDATE_FAILURE:
      return {
        updateLoading: false,
        updateError: action.payload,
        updateUser: null,
      };

    default:
      return state;
  }
};
