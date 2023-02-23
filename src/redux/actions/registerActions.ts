import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_URL } from "./constants";
import axios, { AxiosError } from "axios";
import { DispatchType, User, UserAPI } from "./types";


// 1 - Action creators and thunk for user register


const registerUserRequest = () => ({ 
  type: REGISTER_USER_REQUEST 
});

const registerUserSuccess = (data?: UserAPI) => ({
  type: REGISTER_USER_SUCCESS,
  payload: data,
});

const registerUserFailure = (error: AxiosError) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});


export const registerResetAction = () => {
  return (dispatch: DispatchType) => {
    dispatch(registerUserSuccess());
  };
};


export const registerUserAction = (user: User) => {
  return async (dispatch: DispatchType) => {
    dispatch(registerUserRequest());

    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: REGISTER_USER_URL,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(user),
      };

      const response = await axios(config);
      dispatch(registerUserSuccess(response.data));
    } catch (error) {
      dispatch(registerUserFailure(error as AxiosError));
    }
  };
};
