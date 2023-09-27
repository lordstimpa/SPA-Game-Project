import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Create } from "./components/Create";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create",
    element: <Create />,
  },
];

export default AppRoutes;
