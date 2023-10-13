import ApiAuthorzationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import Home from "./components/Homepage/Home";
import Play from "./components/Subpage/Play";
import { Login } from "./components/Subpage/Login";
import { Register } from "./components/Subpage/Register";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/play",
    element: <Play />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  ...ApiAuthorzationRoutes,
];

export default AppRoutes;
