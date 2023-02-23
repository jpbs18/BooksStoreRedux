import { Link, useLocation, useNavigate } from "react-router-dom";
import { configLinks } from "./links";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUserFromCookiesAction } from "../../redux/actions/loginActions";

const Aside = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useSelector((state: any) => state.loginState);

  const refreshToHomePage = () => {
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    if (document.cookie) {
      dispatch<any>(loginUserFromCookiesAction());
    }
  }, [dispatch]);

  return (
    <aside className="Aside">
      <ul>
        {configLinks
          .filter((link) => link.to !== pathname)
          .filter((link) =>
            user && link.to === "/login"
              ? null
              : !user && link.to === "/logout"
              ? null
              : !user && link.to === "/user"
              ? null
              : link
          )
          .map((link, i) => {
            if (link.description === "Home") {
              return (
                <li key={i}>
                  <Link to={link.to} onClick={refreshToHomePage}>
                    {link.description}
                  </Link>
                </li>
              );
            }
            return (
              <li key={i}>
                <Link to={link.to}>{link.description}</Link>
              </li>
            );
          })}
      </ul>
    </aside>
  );
};

export default Aside;
