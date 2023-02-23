import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages"

const User = lazy(() => import("../pages/user"))
const Logout = lazy(() => import("../pages/logout"))
const Login = lazy(() => import("../pages/login"))
const Register = lazy(() => import("../pages/register"))
const BookPage = lazy(() => import("../pages/book"))

const Routing = () => {
  return (
    
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path={"/"} element={<Home/>} />
          <Route path={"login"} element={<Login/>} />
          <Route path={"logout"} element={<Logout/>} />
          <Route path={"register"} element={<Register/>} />
          <Route path={"user"} element={<User/>} />
          <Route path={"book"} element={<BookPage/>}>
            <Route path={":bookId"} element={<BookPage/>}/>
          </Route>
          <Route path={"*"} element={<Home/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routing;
