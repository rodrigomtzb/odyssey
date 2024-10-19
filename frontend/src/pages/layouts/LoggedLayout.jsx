import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import AlertBubble from "../../components/AlertBubble";

const LoggedLayout = () => {
  const menuItems = [
    { title: "Inicio", icon: "grid-fill", path: "/" },
    {
      title: "Panel de Control",
      icon: "dpad-fill",
      subItems: [
        { title: "Usuarios", path: "/users" },
        { title: "Sesiones", path: "/sessions" },
        { title: "Control de Accesos", path: "/" },
        { title: "Bitacora de Accesos", path: "/" },
        { title: "Roles", path: "/" },
      ],
    },
    {
      title: "Recursos Humanos",
      icon: "people-fill",
      subItems: [
        {
          title: "Empleados",
          path: "/",
        },
        { title: "Control de Asistencia", path: "/" },
      ],
    },
    {
      title: "Marketing",
      icon: "shop",
      subItems: [
        {
          title: "Campañas",
          path: "/",
        },
        {
          title: "Prospectos",
          path: "/",
        },
        {
          title: "Clientes",
          path: "/clients",
        },
        {
          title: "Reportes",
          path: "/",
        },
      ],
    },
    {
      title: "Proyectos",
      icon: "houses-fill",
      subItems: [
        { title: "Proyectos", path: "/works" },
        { title: "Levantamientos", path: "/" },
        { title: "Presupuestos", path: "/" },
        { title: "Avances", path: "/" },
      ],
    },
    {
      title: "Administración",
      icon: "person-lines-fill",
      subItems: [
        { title: "Proveedores", path: "/providers" },
        { title: "Compras", path: "/purchases" },
        { title: "Inventario Material", path: "/" },
      ],
    },
    {
      title: "Finanzas",
      icon: "cash",
      subItems: [
        {
          title: "Control de Pagos",
          path: "/",
          subItems: [
            { title: "Solicitudes", path: "/" },
            { title: "Autorizaciones", path: "/" },
          ],
        },
        {
          title: "Fiscal",
          path: "/",
          subItems: [
            {
              title: "Impuestos",
              path: "/",
            },
            { title: "Facturas", path: "" },
          ],
        },
      ],
    },
  ];

  return (
    <div className="bg-general">
      <Header/>
      <Sidebar menuItems={menuItems} />
      <main
        className="content p-4 main"
        style={{ marginLeft: "280px", position: "relative", zIndex: 2 }}
      >
        <Outlet />
        <AlertBubble notificationCount={0} />
      </main>
    </div>
  );
};

export default LoggedLayout;
