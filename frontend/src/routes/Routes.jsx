import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import HumanResources from "../auth/components/dashboard-components/contents/HumanResources";
import LoggedLayout from "../pages/layouts/LoggedLayout";
import Users from "../pages/ControlPanel/Users/Users";
import UserForm from "../pages/ControlPanel/Users/Form";
import UsersList from "../pages/ControlPanel/List";

import Test from "../pages/Test";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <LoggedLayout />,
    children: [
      {
        path: "/hr",
        element: <HumanResources />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/create",
        element: <UserForm />,
      },
      {
        path: "/users/list",
        element: <UsersList />,
      },
    ],
  },
  {
    path: "test",
    element: <Test />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
