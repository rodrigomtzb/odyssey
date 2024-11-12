import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useOutlet } from "react-router-dom";
import AlertBubble from "../../components/AlertBubble";
import { Loader, MainCard } from "../../components";
import requestPermission from "../../utils/permissions";
import getRegistrationToken from "../../utils/token";
import { useLoader } from "../../context/Loader/LoaderProvider";
import { Offcanvas } from "react-bootstrap";

const LoggedLayout = () => {
  const outletContent = useOutlet();
  const { isLoading } = useLoader();
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false);
  const menuItems = [
    { title: "Inicio", icon: "grid-fill", path: "/" },
    {
      title: "Panel de Control",
      icon: "dpad-fill",
      subItems: [
        { title: "Usuarios", path: "/users" },
        { title: "Sesiones", path: "/sessions" },
        // { title: "Control de Accesos", path: "/" },
        // { title: "Bitacora de Accesos", path: "/" },
        // { title: "Roles", path: "/" },
      ],
    },
    {
      title: "Administración",
      icon: "person-lines-fill",
      subItems: [
        { title: "Proveedores", path: "/providers" },
        { title: "Compras", path: "/purchases" },
        // { title: "Inventario Material", path: "/" },
      ],
    },
    // {
    //   title: "Recursos Humanos",
    //   icon: "people-fill",
    //   subItems: [
    //     {
    //       title: "Empleados",
    //       path: "/",
    //     },
    //     { title: "Control de Asistencia", path: "/" },
    //   ],
    // },
    {
      title: "Marketing",
      icon: "shop",
      subItems: [
        // {
        //   title: "Campañas",
        //   path: "/",
        // },
        // {
        //   title: "Prospectos",
        //   path: "/",
        // },
        {
          title: "Clientes",
          path: "/customers",
        },
        // {
        //   title: "Reportes",
        //   path: "/",
        // },
      ],
    },
    {
      title: "Proyectos",
      icon: "houses-fill",
      subItems: [
        { title: "Proyectos", path: "/projects" },
        // { title: "Levantamientos", path: "/" },
        // { title: "Presupuestos", path: "/" },
        // { title: "Avances", path: "/" },
      ],
    },
    // {
    //   title: "Finanzas",
    //   icon: "cash",
    //   subItems: [
    //     {
    //       title: "Control de Pagos",
    //       path: "/",
    //       subItems: [
    //         { title: "Solicitudes", path: "/" },
    //         { title: "Autorizaciones", path: "/" },
    //       ],
    //     },
    //     {
    //       title: "Fiscal",
    //       path: "/",
    //       subItems: [
    //         {
    //           title: "Impuestos",
    //           path: "/",
    //         },
    //         { title: "Facturas", path: "" },
    //       ],
    //     },
    //   ],
    // },
  ];

  const toggleSidebar = () => {
    setIsVisibleSidebar(!isVisibleSidebar);
  };

  // useEffect(() => {
  //   requestPermission();
  //   getRegistrationToken();
  // }, []);

  return (
    <div className="bg-general">
      {isLoading && <Loader />}
      <Header onToggleSidebar={toggleSidebar} />
      <Offcanvas
        show={isVisibleSidebar}
        onHide={toggleSidebar}
        responsive="lg"
        placement="start"
        style={{ width: "230px" }}
      >
        <Sidebar menuItems={menuItems} onToggleSidebar={toggleSidebar} />
      </Offcanvas>
      {isVisibleSidebar && (
        <div
          className="overlay w-100 h-100 lg:hidden fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
      {outletContent && (
        <main
          className="content p-2 p-lg-4"
          style={{ position: "relative", zIndex: 2 }}
        >
          <MainCard>{outletContent}</MainCard>
          <AlertBubble notificationCount={0} />
        </main>
      )}
    </div>
  );
};

export default LoggedLayout;
