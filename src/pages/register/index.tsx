import Form from "../../components/Form";
import PageLayout from "../../layout/pageLayout";
import { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerResetAction, registerUserAction } from "../../redux/actions/registerActions";
import { formConfig } from "./configForm";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state: any) => state.registerState);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const refs = [nameRef, passwordRef, emailRef];

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const payload = {
        name: nameRef.current?.value,
        password: passwordRef.current?.value,
        email: emailRef.current?.value,
      };

      dispatch<any>(registerUserAction(payload));
      dispatch<any>(registerResetAction());
    },
    [dispatch]
  );

  return (
    <PageLayout>
      <div>
        <Form 
          tag={"Create your account!"} 
          config={formConfig} 
          inputs={refs} 
          handleSubmit={handleSubmit} 
        />
        {error ? (
          <h2>{error.response.data.errors[0]}</h2>
        ) : loading ? (
          <h2>Registing your credentials...</h2>
        ) : user ? (
          <h2>{`Thank you for registering ${user.data.name}!`}</h2>
        ) : null}
      </div>
    </PageLayout>
  );
};

export default Register;
