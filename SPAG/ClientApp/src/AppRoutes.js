import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Create } from "./components/Create";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    element: <Login />,
  },
  {
    element: <Create />,
  },
];

export default AppRoutes;
