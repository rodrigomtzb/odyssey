import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import DashBoard from './auth/components/DashBoard';
import ErrorPage from "./Error-page";
import Login from "./Login";

import './index.css'


import { AuthProvider } from './auth';
import HumanResources from './auth/components/dashboard-components/contents/HumanResources';
import Treasury from './auth/components/dashboard-components/contents/Treasury';
import Statistics from './auth/components/dashboard-components/contents/Statistics';
import Projects from './auth/components/dashboard-components/contents/Projects';
import Notifications from './auth/components/dashboard-components/contents/Notifications';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      {
        path: "/dashboard/rh",
        element: <HumanResources />,
      },
      {
        path: "/dashboard/tesoreria",
        element: <Treasury />,
      },
      {
        path: "/dashboard/proyectos",
        element: <Projects />,
      },
      {
        path: "/dashboard/estadisticas",
        element: <Statistics />,
      },

      {
        path: "/dashboard/notificaciones",
        element: <Notifications />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>,
)
