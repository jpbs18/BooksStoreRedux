import { useCallback, useEffect, useRef } from "react";
import { Form, UserProfile } from "../../components";
import PageLayout from "../../layout/pageLayout";
import { userFormConfig, bookFormConfig } from "./configForm";
import { useSelector, useDispatch } from "react-redux";
import { loginUserFromCookiesAction } from "../../redux/actions/loginActions";
import { userUpdateAction } from "../../redux/actions/userActions";
import { addBookAction } from "../../redux/actions/booksActions";
import { Container } from "./style";

const User = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.loginState);
  const { updateUser } = useSelector((state: any) => state.userState);

  const userName = useRef<HTMLInputElement>(null);
  const userEmail = useRef<HTMLInputElement>(null);
  const userPicture = useRef<HTMLInputElement>(null);

  const bookTitle = useRef<HTMLInputElement>(null);
  const bookDescription = useRef<HTMLInputElement>(null);
  const bookYear = useRef<HTMLInputElement>(null);
  const bookCover = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch<any>(loginUserFromCookiesAction());
  }, [dispatch, updateUser]);

  const handleSubmitUserForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const updatedUser = {
        email: userEmail.current!.value,
        name: userName.current!.value,
        profile_picture: userPicture.current!.value,
      };

      dispatch<any>(userUpdateAction(updatedUser));
      userName.current!.value = "";
      userEmail.current!.value= "";
      userPicture.current!.value = "";

    },
    [dispatch]
  );

  const handleSubmitBookForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newBook = {
        title: bookTitle.current!.value,
        description: bookDescription.current!.value,
        year: parseInt(bookYear.current!.value),
        book_cover: bookCover.current!.value,
      };

      dispatch<any>(addBookAction(newBook))
    },
    [dispatch]
  );

  return (
    <PageLayout>
      <Container>
        {user ? (
          <>
            <UserProfile user={user} />
            <Form
              tag={"Update your credentials!"}
              config={userFormConfig}
              inputs={[userName, userEmail, userPicture]}
              handleSubmit={handleSubmitUserForm}
            />
            <Form
              tag={"Add Book!"}  
              config={bookFormConfig}
              inputs={[bookTitle, bookDescription, bookYear, bookCover]}
              handleSubmit={handleSubmitBookForm}
            />
          </>
        ) : (
          <h2>Sign up if you want to update credentials.</h2>
        )}
      </Container>
    </PageLayout>
  );
};

export default User;
