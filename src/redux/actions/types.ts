import { AxiosError } from "axios";

interface Book {
  id: number;
  title: string;
  year: number;
  description: string;
  book_cover: string;
  user: {
    id: number;
    name: string;
    email: string;
    profile_picture: string;
  };
}

interface User {
  name?: string;
  email?: string;
  password?: string;
}

interface UpdatedUser {
  email: string | undefined,
  name: string | undefined,
  profile_picture: string | undefined
}

interface SubmittedBook {
  title: string,
  description: string,
  year: number,
  book_cover: string
}

interface UserAPI {
  data: {
    id: number;
    name: string;
    email: string;
    profile_picture: string;
    token?: string;
  };
}


interface Action {
  type: string;
  payload?: AxiosError | Book[] | UserAPI | string | Book | number;
}

type DispatchType = (args: Action) => Action;

export type { Action, Book, DispatchType, User, UserAPI, UpdatedUser, SubmittedBook };
