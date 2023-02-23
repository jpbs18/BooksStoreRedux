import { useDispatch } from "react-redux";
import PageLayout from "../../layout/pageLayout";
import { loginResetAction } from "../../redux/actions/loginActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch<any>(loginResetAction());
    setTimeout(() => navigate("/"), 1000);
  }, [dispatch, navigate]);

  return (
    <PageLayout>
      <h2>Have a nice day, come back soon!</h2>
    </PageLayout>
  );
};

export default Logout;
