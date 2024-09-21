import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import DashBoard from "../pages/DashBoard";
const Login = React.lazy(() => import("../pages/Login"));
const HumanResources = React.lazy(() =>
  import("../auth/components/dashboard-components/contents/HumanResources")
);
const LoggedLayout = React.lazy(() => import("../pages/layouts/LoggedLayout"));
const Users = React.lazy(() => import("../pages/ControlPanel/Users/Users"));
const UserForm = React.lazy(() => import("../pages/ControlPanel/Users/Form"));
const UsersList = React.lazy(() => import("../pages/ControlPanel/Users/_partials/List"));
const UserDetails = React.lazy(() =>
  import("../pages/ControlPanel/Users/User")
);

import Test from "../pages/Test";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoggedLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/hr",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HumanResources />
          </Suspense>
        ),
      },
      {
        path: "/users",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: "/users/create",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserForm />
          </Suspense>
        ),
      },
      {
        path: "/users/list",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UsersList />
          </Suspense>
        ),
      },
      {
        path: "/users/:id/edit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserForm />
          </Suspense>
        ),
      },
      {
        path: "/users/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserDetails />,
          </Suspense>
        ),
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
