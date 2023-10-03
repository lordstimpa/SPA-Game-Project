import ApiAuthorzationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { Home } from "./components/Home";
import { Play } from "./components/Play";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/play",
    element: <Play />,
  },
  ...ApiAuthorzationRoutes,
];

export default AppRoutes;
