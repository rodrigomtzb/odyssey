import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/Routes.jsx";
import "./css/index.css";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import { LoaderProvider } from "./context/Loader/LoaderProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoaderProvider>
      <AppRoutes />
    </LoaderProvider>
  </React.StrictMode>
);
