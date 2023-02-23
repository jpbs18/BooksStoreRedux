import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_URL,
  RESET_LOGIN,
  LOGIN_COOKIES,
} from "./constants";
import { DispatchType, User, UserAPI } from "./types";
import axios, { AxiosError } from "axios";
import { getUserFromCookies } from "../../utils/functions";


// 1 - Action creators and thunk for user login


const loginUserRequest = () => ({ 
  type: LOGIN_USER_REQUEST 
});

const loginUserSuccess = (user: UserAPI) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

const loginUserFailure = (error: AxiosError) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const loginUserAction = (user: User) => {
  return async (dispatch: DispatchType) => {
    dispatch(loginUserRequest());

    try {
      
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: LOGIN_USER_URL,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(user),
      };

      const response = await axios(config);
      document.cookie = `access_user=${JSON.stringify(response.data.data)}`;
      dispatch(loginUserSuccess(response.data.data));
    } catch (error) {
      dispatch(loginUserFailure(error as AxiosError));
    }
  };
};


// 2 - Action creators and thunk to logout user


const loginReset = () => ({ 
  type: RESET_LOGIN 
});

export const loginResetAction = () => {
  return (dispatch: DispatchType) => {
    dispatch(loginReset());
    document.cookie =
      "access_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  };
};


// 3 - Action creators and thunk to authenticate user from cookie storage


const loginUserFromCookie = (data: UserAPI) => ({
  type: LOGIN_COOKIES,
  payload: data,
});

export const loginUserFromCookiesAction = () => {
  return (dispatch: DispatchType) => {
    const data = getUserFromCookies()
    dispatch(loginUserFromCookie(data));
  };
};
