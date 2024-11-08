import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../pages/DashBoard";
import SupplierDetails from "../pages/Projects/Providers/Supplier";
import CustomerList from "../pages/Marketing/Customers/List";
import CustomerDetails from "../pages/Marketing/Customers/Customer";
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

const Loader = React.lazy(() => import("../components/Loader"));
const DashboardPurchases = React.lazy(() =>
  import("../pages/Administration/Purchases/Dashboard")
);
const PurchaseForm = React.lazy(() =>
  import("../pages/Administration/Purchases/Form")
);
const PurchasesList = React.lazy(() =>
  import("../pages/Administration/Purchases/List")
);
const DashboardProviders = React.lazy(() =>
  import("../pages/Projects/Providers/Dashboard")
);
const DashboardWorks = React.lazy(() =>
  import("../pages/Projects/Works/Dashboard")
);
const ProviderForm = React.lazy(() =>
  import("../pages/Projects/Providers/Form")
);
const WorkForm = React.lazy(() => import("../pages/Projects/Works/Form"));
const DashboardCustomers = React.lazy(() =>
  import("../pages/Marketing/Customers/Dashboard")
);
const CustomerForm = React.lazy(() =>
  import("../pages/Marketing/Customers/Form")
);
const DashboardSessions = React.lazy(() =>
  import("../pages/ControlPanel/Sessions/Dashboard")
);
const SessionsList = React.lazy(() =>
  import("../pages/ControlPanel/Sessions/List")
);
const LoggedRoute = React.lazy(() => import("./LoggedRoute"));
const TableLoader = React.lazy(() => import("../loaders/TableLoader"));
const Timeline = React.lazy(() => import("../pages/Timeline"));
const SupplierList = React.lazy(() =>
  import("../pages/Projects/Providers/List")
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <LoggedRoute>
        <Login />
      </LoggedRoute>
    ),
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
        // loader: <TableLoader />
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
        path: "/providers/:id",
        element: <SupplierDetails />,
      },
      {
        path: "/providers/create",
        element: <ProviderForm />,
      },
      {
        path: "/providers/:id/edit",
        element: <ProviderForm />,
      },
      {
        path: "/providers/list",
        element: <SupplierList />,
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
        path: "/customers",
        element: <DashboardCustomers />,
      },
      {
        path: "/customers/create",
        element: <CustomerForm />,
      },
      {
        path: "/customers/:id/edit",
        element: <CustomerForm />
      },
      {
        path: "/customers/list",
        element: <CustomerList />,
      },
      {
        path: "/customers/:id",
        element: <CustomerDetails />,
      },
      {
        path: "/loader",
        element: <Loader />,
      },
      {
        path: "/timeline",
        element: <Timeline />,
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
