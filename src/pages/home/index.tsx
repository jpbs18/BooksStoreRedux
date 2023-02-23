import PageLayout from "../../layout/pageLayout";
import BookCover from "../../components/BookCover";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooksAction } from "../../redux/actions/booksActions";
import { useEffect } from "react";
import { Book } from "../../redux/actions/types";
import { BookList } from "./style";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, books } = useSelector((state: any) => state.booksList);

  useEffect(() => {
    const controller = new AbortController()
    dispatch<any>(fetchAllBooksAction(controller.signal));
    return () => controller.abort();
  }, [dispatch]);

  return (
    <PageLayout>
      <div className="Main">
        {error ? (
          <h1>{error}</h1>
        ) : loading ? (
          <h1>Loading books...</h1>
        ) : (
          <BookList>
            {books.map((book: Book) => {
              return (
                <BookCover
                  key={book.id}
                  title={book.title}
                  cover={book.book_cover}
                  id={book.id}
                />
              );
            })}
          </BookList>
        )}
      </div>
    </PageLayout>
  );
};

export default Home;
