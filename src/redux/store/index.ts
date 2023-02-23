import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import { booksReducer, loginReducer, userReducer, registerReducer } from "../reducers";

const middlewares = [reduxThunk];

export const store = createStore(
  combineReducers({
    booksList: booksReducer,
    registerState: registerReducer,
    loginState: loginReducer,
    userState: userReducer
  }),
  composeWithDevTools(applyMiddleware(...middlewares))
);
