import Home from "@/pages/Home/Home.jsx";
import SignIn from "@/pages/Authentication/SignIn.jsx";
import SignUp from "../pages/Authentication/SignUp";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
];

export default routes;
