import { Action, Book } from "../actions/types";
import { FETCH_ALL_BOOKS_FAILURE, FETCH_ALL_BOOKS_REQUEST, FETCH_ALL_BOOKS_SUCCESS,
ADD_BOOK_FAILURE, ADD_BOOK_REQUEST, ADD_BOOK_SUCCESS, DELETE_BOOK_FAILURE, 
DELETE_BOOK_REQUEST, DELETE_BOOK_SUCCESS, UPDATE_BOOK_FAILURE, UPDATE_BOOK_REQUEST,
UPDATE_BOOK_SUCCESS } from "../actions/constants";

const initialState = {
  loading: false,
  error: "",
  books: [],
};

export const booksReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_ALL_BOOKS_REQUEST || ADD_BOOK_REQUEST || DELETE_BOOK_REQUEST || UPDATE_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ALL_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload,
      };

    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: [...state.books, action.payload]
      }
    
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: state.books.filter((book: Book) => book.id !== action.payload)
      }
      
    case UPDATE_BOOK_SUCCESS: 
      return {
        ...state,
        loading: false,
        books: action.payload
      }  

    case FETCH_ALL_BOOKS_FAILURE || ADD_BOOK_FAILURE || DELETE_BOOK_FAILURE || UPDATE_BOOK_FAILURE:
      return {
        loading: false,
        error: action.payload,
        books: [],
      };

    default:
      return state;
  }
};
