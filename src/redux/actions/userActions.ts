import { USER_UPDATE_FAILURE, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_URL } from "./constants";
import axios, { AxiosError } from "axios";
import { DispatchType, UserAPI, UpdatedUser } from "./types";
import { getTokenFromCookies } from "../../utils/functions";


// 1 - Action creators and thunk to update user credentials


const userUpdateRequest = () => ({ 
  type: USER_UPDATE_REQUEST 
});

const userUpdateSuccess = (user: UserAPI) => ({
  type: USER_UPDATE_SUCCESS,
  payload: user,
});

const userUpdateFailure = (error: AxiosError) => ({
  type: USER_UPDATE_FAILURE,
  payload: error,
});


export const userUpdateAction = (updatedUser: UpdatedUser) => {
  return async (dispatch: DispatchType) => {
    dispatch(userUpdateRequest());

    try {
      const token = getTokenFromCookies()

      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: USER_UPDATE_URL,
        headers: {
          "Authorization": token,
          "Content-Type": "application/json",
        },
        data: JSON.stringify(updatedUser),
      };

      const response = await axios(config);
      document.cookie = `access_user=${JSON.stringify({...response.data.data, token})}`;
      dispatch(userUpdateSuccess(response.data.data));
    } catch (error) {
      dispatch(userUpdateFailure(error as AxiosError));
    }
  };
};
