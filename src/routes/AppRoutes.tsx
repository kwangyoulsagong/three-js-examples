import { Outlet, RouteObject } from "react-router-dom";
import BoxExamplePage from "../pages/BoxExamplePage";
import MainPage from "../pages/MainPage";

const createAppRoutes = (): RouteObject[] => {
  const appChildren = [
    {
      indexed: true,
      path: "/",
      element: <MainPage />,
    },
    {
      path: "box-example",
      element: <BoxExamplePage />,
    },
  ];

  return [
    {
      path: "/",
      element: <Outlet />,
      children: appChildren,
    },
  ];
};

export const appRoutes = createAppRoutes();
