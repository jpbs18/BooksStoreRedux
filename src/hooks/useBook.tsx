import { useEffect, useState } from "react";
import { initialState } from "../pages/book/initialState";
import { Book } from "../redux/actions/types";
import { getBookId, getBooksFromStorage, getUserFromCookies } from "../utils/functions";

export const useBook = (path: string) => {
  const [currentBook, setCurrentBook] = useState<Book>(initialState);
  const [bookBelongsToUser, setBookBelongsToUser] = useState(false);

  useEffect(() => {
    const bookId = getBookId(path);
    const books = getBooksFromStorage();
    const book = books.find((book: Book) => book.id === bookId);

    if (book) {
      setCurrentBook(book);
    }

    if (document.cookie) {
      const user = getUserFromCookies();
      const belongsToUser = book.user.id === user.id;
      setBookBelongsToUser(belongsToUser);
    }
  }, [path]);

  return { currentBook, bookBelongsToUser };
};
