import Form from "../../components/Form";
import PageLayout from "../../layout/pageLayout";
import { formConfig } from "./configForm";
import { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../redux/actions/loginActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state: any) => state.loginState);
  
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const payload = {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };

      dispatch<any>(loginUserAction(payload));
    },
    [dispatch]
  );

  useEffect(() => {
    if (user){
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <PageLayout>
      <div>
        <Form
          tag={"Sign In!"}
          config={formConfig}
          inputs={[passwordRef, emailRef]}
          handleSubmit={handleSubmit}
        />
        {error ? (
          <h2>{error.response.data.errors[0]}</h2>
        ) : loading ? (
          <h2>Receiving your credentials...</h2>
        ) : null}
      </div>
    </PageLayout>
  );
};

export default Login;
