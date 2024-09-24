import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const LoggedLayout = () => {
  const token = localStorage.getItem("token");
  const menuItems = [
    { title: "Inicio", icon: "grid-fill", path: "/" },
    { title: "Recursos Humanos", icon: "people-fill", path: "/hr" },
    {
      title: "Tesoreria",
      icon: "cash",
      subItems: [{ title: "Pagos", path: "" }],
    },
    { title: "Proyectos", icon: "houses-fill", path: "" },
    {
      title: "Panel de Control",
      icon: "dpad-fill",
      subItems: [{ title: "Usuarios", path: "/users" }],
    },
    {
      title: "Administración",
      icon: "person-lines-fill",
      subItems: [
        { title: "Provedores", path: "" },
        { title: "Compras", path: "" },
      ],
    },
  ];

  return (
    <div className="bg-general">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%-250px",
          height: "100%-250px",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          zIndex: 1,
          marginLeft: "250px",
        }}
      />
      <Sidebar menuItems={menuItems} />
      <main
        className="content p-4"
        style={{ marginLeft: "250px", position: "relative", zIndex: 2 }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default LoggedLayout;
