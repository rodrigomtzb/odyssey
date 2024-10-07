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
const UsersList = React.lazy(() =>
  import("../pages/ControlPanel/Users/_partials/List")
);
const UserDetails = React.lazy(() =>
  import("../pages/ControlPanel/Users/User")
);

import Test from "../pages/Test";
import Loader from "../components/Loader";
import DashboardPurchases from "../pages/Administration/Purchases/Dashboard";
import PurchaseForm from "../pages/Administration/Purchases/Form";
import PurchasesList from "../pages/Administration/Purchases/List";

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
      {
        path: "/users/:id/edit",
        element: <UserForm />,
      },
      {
        path: "/users/:id",
        element: <UserDetails />,
      },
      {
        path: "/purchases",
        element: <DashboardPurchases />
      },
      {
        path: "/purchases/create",
        element: <PurchaseForm />
      },
      {
        path: "/purchases/list",
        element: <PurchasesList />
      },
      {
        path: "/loader",
        element: <Loader />,
      },
    ],
  },
  {
    path: "test",
    element: <Test />,
  },
]);

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />;
      </Suspense>
    </>
  );
};

export default AppRoutes;
