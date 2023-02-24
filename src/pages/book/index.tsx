import { useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookCover, Button, Form } from "../../components";
import PageLayout from "../../layout/pageLayout";
import { configUpdateForm } from "./configForm";
import { BooksContainer } from "./styles";
import { useBook } from "../../hooks/useBook"
import { deleteBookAction, updateBookAction } from "../../redux/actions/booksActions";
import { getBookId } from "../../utils/functions";
import { useDispatch } from "react-redux";

const BookPage = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const bookId = getBookId(location.pathname)
  const { currentBook, bookBelongsToUser } = useBook(location.pathname)

  const bookTitle = useRef<HTMLInputElement | null>(null);
  const bookDescription = useRef<HTMLInputElement | null>(null);
  const bookYear = useRef<HTMLInputElement | null>(null);
  const bookCover = useRef<HTMLInputElement | null>(null);

  const handleUpdate = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newBook = {
      title: bookTitle.current!.value,
      description: bookDescription.current!.value,
      year: parseInt(bookYear.current!.value),
      book_cover: bookCover.current!.value
    }

    dispatch<any>(updateBookAction(bookId, newBook))
    setTimeout(() => navigate("/"), 1000)
  }, [dispatch, bookId, navigate]);

  const handleDelete = () => {
    dispatch<any>(deleteBookAction(bookId))
    setTimeout(() => navigate("/"), 1000)
  }

  return (
    <PageLayout>
      <BooksContainer className="Main">

        <div>
          <h2>{currentBook.title}</h2>
          <img src={currentBook.book_cover} alt={currentBook.title} loading="lazy"/>
          <h4>{currentBook.id}</h4>
        </div>
          
        {bookBelongsToUser && (
          <div>
            <Button onClick={handleDelete}>Delete Book</Button>
            <Form
              tag={"Update your book!"}
              config={configUpdateForm}
              inputs={[bookTitle, bookDescription, bookYear, bookCover]}
              handleSubmit={handleUpdate}
            />
          </div>
        )}
        
      </BooksContainer>
    </PageLayout>
  );
};

export default BookPage;
