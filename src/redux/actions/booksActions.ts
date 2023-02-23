import { FETCH_ALL_BOOKS_FAILURE, FETCH_ALL_BOOKS_REQUEST, FETCH_ALL_BOOKS_SUCCESS, FETCH_ALL_BOOKS_URL, 
  ADD_BOOK_FAILURE, ADD_BOOK_REQUEST, ADD_BOOK_SUCCESS, BOOK_URL,DELETE_BOOK_FAILURE, DELETE_BOOK_REQUEST, 
  DELETE_BOOK_SUCCESS, UPDATE_BOOK_FAILURE, UPDATE_BOOK_REQUEST, UPDATE_BOOK_SUCCESS } from "./constants";
import axios, { AxiosError } from "axios";
import { Book, DispatchType, SubmittedBook } from "./types";
import { getBooksFromStorage, getTokenFromCookies, getUserFromCookies } from "../../utils/functions";


// 1 - Action creators and thunk for fetching all books


const fetchAllBooksRequest = () => ({ 
  type: FETCH_ALL_BOOKS_REQUEST 
});

const fetchAllBooksSuccess = (data: Book[]) => ({
  type: FETCH_ALL_BOOKS_SUCCESS,
  payload: data,
});

const fetchAllBooksFailure = (error: AxiosError) => ({
  type: FETCH_ALL_BOOKS_FAILURE,
  payload: error,
});

export const fetchAllBooksAction = (signal: AbortSignal) => {
  return async (dispatch: DispatchType) => {
    if (localStorage.getItem("books")) {
      const books = getBooksFromStorage()
      dispatch(fetchAllBooksSuccess(books));
      return;
    }

    dispatch(fetchAllBooksRequest());
   
    try {
      const response = await axios.get(FETCH_ALL_BOOKS_URL, { signal });
      dispatch(fetchAllBooksSuccess(response.data.data));
      localStorage.setItem("books", JSON.stringify(response.data.data));
    } catch (error) {
      dispatch(fetchAllBooksFailure(error as AxiosError));
    }
  };
};


// 2 - Action creators and thunk to add a new book


const addBookRequest = () => ({
  type: ADD_BOOK_REQUEST
})

const addBookSuccess = (data: Book) => ({
  type: ADD_BOOK_SUCCESS,
  payload: data
})

const addBookFailure = (error: AxiosError) => ({
  type:ADD_BOOK_FAILURE,
  payload: error
})

export const addBookAction = (book: SubmittedBook) => {
  return async(dispatch: DispatchType) => {
    dispatch(addBookRequest())

    try{

      const books = getBooksFromStorage()

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: BOOK_URL,
        headers: {
          "Authorization": getTokenFromCookies(),
          "Content-Type": "application/json"
        },
        data: JSON.stringify(book)
      }

      const response = await axios(config)
      localStorage.setItem("books", JSON.stringify([...books, response.data.data]))
      dispatch(addBookSuccess(response.data.data))
    }catch(error){
      dispatch(addBookFailure(error as AxiosError))
      alert("Something went wrong...please fill the form correctly or sign in again")
    }
  }
}


// 3 - Action creators and thunk to delete a book


const deleteBookRequest = () => ({
  type: DELETE_BOOK_REQUEST
})

const deleteBookSuccess = (id: number) => ({
  type: DELETE_BOOK_SUCCESS,
  payload: id 
})

const deleteBookFailure = (error: AxiosError) => ({
  type: DELETE_BOOK_FAILURE,
  payload: error
})


export const deleteBookAction = (id: number) => {
  return async(dispatch: DispatchType) => {
    dispatch(deleteBookRequest())

    try{

      const config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: BOOK_URL + `/${id}`,
        headers: {
          "Authorization": getTokenFromCookies(),
          "Content-Type": "application/json"
        }
      }

      const response = await axios(config)

      if(response.status === 200){
        const books = getBooksFromStorage()

        localStorage.setItem("books", JSON.stringify(
          books.filter((book: Book) => book.id !== id)
        ))

        dispatch(deleteBookSuccess(id))
      }
    }catch(error){
      dispatch(deleteBookFailure(error as AxiosError))
      alert("Your access token expired! Please login again.")
    }
  }
}


// 4 - Action creators and thunk to update an existing book 


const updateBookRequest = () => ({
  type: UPDATE_BOOK_REQUEST
})

const updateBookSuccess = (booksList: Book[]) => ({
  type: UPDATE_BOOK_SUCCESS,
  payload: booksList
})

const updateBookFailure = (error: AxiosError) => ({
  type: UPDATE_BOOK_FAILURE,
  payload: error
})


export const updateBookAction = (id: number, updatedBook: SubmittedBook) => {
  return async(dispatch: DispatchType) => {
    dispatch(updateBookRequest())

    try{

      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: BOOK_URL + `/${id}`,
        headers: {
          "Authorization": getTokenFromCookies(),
          "Content-Type": "application/json"
        }, 
        data: JSON.stringify(updatedBook)
      }

      await axios(config);
      const books = getBooksFromStorage()

      const updatedBooksList = books.map((book: Book) => {
        if(book.id === id){
          return {
            id,
            ...updatedBook,
            user: getUserFromCookies()
          }
        }

        return book;
      })

      localStorage.setItem("books", JSON.stringify(updatedBooksList))
      dispatch(updateBookSuccess(updatedBooksList))
      alert("Your book was successfully updated!")
    }catch(error){
      dispatch(updateBookFailure(error as AxiosError))
    }
  }
}