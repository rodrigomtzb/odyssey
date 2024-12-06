import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import PrivateRoute from "./PrivateRoute";
import LoggedLayout from "../pages/Layouts/LoggedLayout";
import SupplierDetails from "../pages/Projects/Providers/Supplier";
import CustomerList from "../pages/Marketing/Customers/List";
import CustomerDetails from "../pages/Marketing/Customers/Customer";
import ProjectsList from "../pages/Projects/Projects/List";
import ProjectDetails from "../pages/Projects/Projects/Project";
import DashboardJobs from "../pages/HumanResources/Jobs/Dashboard";
import JobForm from "../pages/HumanResources/Jobs/Form";
import JobsList from "../pages/HumanResources/Jobs/List";
import JobDetails from "../pages/HumanResources/Jobs/Job";
import DashboardAccesses from "../pages/ControlPanel/Access/Dashboard";
import AccessesList from "../pages/ControlPanel/Access/AccessesList";
import SyncAccessForm from "../pages/ControlPanel/Access/SyncAccessForm";
import MenuItemsList from "../pages/ControlPanel/Access/MenuItemsList";
import JobWithAccesses from "../pages/ControlPanel/Access/JobWithAccesses";
import OrgChart from "../pages/HumanResources/OrganizationChart/OrgChart";
import DashboardNotification from "../pages/Notifications/Dashboard";
import SendMail from "../pages/Notifications/Email/SendMail";
import Test from "../pages/Test";
const Login = React.lazy(() => import("../pages/Login"));
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
const DashboardProjects = React.lazy(() =>
  import("../pages/Projects/Projects/Dashboard")
);
const ProviderForm = React.lazy(() =>
  import("../pages/Projects/Providers/Form")
);
const ProjectForm = React.lazy(() => import("../pages/Projects/Projects/Form"));
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

const router = createBrowserRouter(
  [
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
        // Puestos
        {
          path: "/jobs",
          element: <DashboardJobs />,
        },
        {
          path: "/jobs/create",
          element: <JobForm />,
        },
        {
          path: "/jobs/list",
          element: <JobsList />,
        },
        {
          path: "/jobs/:id",
          element: <JobDetails />,
        },
        {
          path: "/jobs/:id/edit",
          element: <JobForm />
        },
        // Organigrama
        {
          path: "/organization-chart",
          element: <OrgChart />,
        },
        // Usuarios
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
        // Sesiones
        {
          path: "/sessions",
          element: <DashboardSessions />,
        },
        {
          path: "/sessions/list",
          element: <SessionsList />,
        },
        //Accesos
        {
          path: "/accesses",
          element: <DashboardAccesses />,
        },
        {
          path: "/accesses/list",
          element: <AccessesList />,
        },
        {
          path: "/accesses/jobs/sync",
          element: <SyncAccessForm />,
        },
        {
          path: "/accesses/jobs/:id",
          element: <JobWithAccesses />,
        },
        {
          path: "/accesses/menu-items/list",
          element: <MenuItemsList />,
        },
        // Proveedores
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
        // Proyectos
        {
          path: "/projects",
          element: <DashboardProjects />,
        },
        {
          path: "/projects/:id",
          element: <ProjectDetails />,
        },
        {
          path: "/projects/create",
          element: <ProjectForm />,
        },
        {
          path: `/projects/:id/edit`,
          element: <ProjectForm />,
        },
        {
          path: "/projects/list",
          element: <ProjectsList />,
        },
        // Compras
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
        // Clientes
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
          element: <CustomerForm />,
        },
        {
          path: "/customers/list",
          element: <CustomerList />,
        },
        {
          path: "/customers/:id",
          element: <CustomerDetails />,
        },
        // Notificaciones
        {
          path: "/notifications",
          element: <DashboardNotification />,
        },
        {
          path: "/notifications/send-mail",
          element: <SendMail />,
        },
        {
          path: "/loader",
          element: <Loader />,
        },
        {
          path: "/timeline",
          element: <Timeline />,
        },
        {
          path: "/test",
          element: <Test />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <PrimeReactProvider>
          <RouterProvider router={router} />
        </PrimeReactProvider>
      </Suspense>
    </>
  );
};

export default AppRoutes;
