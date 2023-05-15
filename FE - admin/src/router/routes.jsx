import SignIn from "@/pages/Authentication/SignIn.jsx";
import SignUp from "../pages/Authentication/SignUp";
import User from "../pages/Admin/User";
import Reserve from "../pages/Admin/Reserve";
import HomeAdmin from "../pages/Admin/HomeAdmin";
const routes = [
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/admin/user",
    element: <User />,
  },
  {
    path: "/admin/packing-reserve",
    element: <Reserve />,
  },
  {
    path: "/admin/home",
    element: <HomeAdmin />,
  },
];

export default routes;
