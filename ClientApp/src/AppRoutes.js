import ApiAuthorzationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import Home from "./components/Home";
import Play from "./components/Play";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

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
