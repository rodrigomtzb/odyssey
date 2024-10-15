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

import Loader from "../components/Loader";
import DashboardPurchases from "../pages/Administration/Purchases/Dashboard";
import PurchaseForm from "../pages/Administration/Purchases/Form";
import PurchasesList from "../pages/Administration/Purchases/List";
import DashboardProviders from "../pages/Projects/Providers/Dashboard";
import DashboardWorks from "../pages/Projects/Works/Dashboard";
import ProviderForm from "../pages/Projects/Providers/Form";
import WorkForm from "../pages/Projects/Works/Form";
import DashboardClients from "../pages/Marketing/Clients/Dashboard";
import ClientForm from "../pages/Marketing/Clients/Form";
import DashboardSessions from "../pages/ControlPanel/Sessions/Dashboard";
import SessionsList from "../pages/ControlPanel/Sessions/List";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <LoggedLayout />
      </PrivateRoute>
    ),
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
        path: "/sessions",
        element: <DashboardSessions />,
      },
      {
        path: "/sessions/list",
        element: <SessionsList />,
      },
      {
        path: "/providers",
        element: <DashboardProviders />,
      },
      {
        path: "/providers/create",
        element: <ProviderForm />,
      },
      {
        path: "/works",
        element: <DashboardWorks />,
      },
      {
        path: "/works/create",
        element: <WorkForm />,
      },
      {
        path: "/purchases",
        element: <DashboardPurchases />,
      },
      {
        path: "/purchases/create",
        element: <PurchaseForm />,
      },
      {
        path: "/purchases/list",
        element: <PurchasesList />,
      },
      {
        path: "/clients",
        element: <DashboardClients />,
      },
      {
        path: "/clients/create",
        element: <ClientForm />,
      },
      {
        path: "/clients/list",
      },
      {
        path: "/loader",
        element: <Loader />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default AppRoutes;
