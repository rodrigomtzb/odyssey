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
import UserService from "../../services/user.service";
import AccessService from "../../services/access.service";

const LoggedLayout = () => {
  const outletContent = useOutlet();
  const { isLoading } = useLoader();
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const toggleSidebar = () => {
    setIsVisibleSidebar(!isVisibleSidebar);
  };
  const fetchMenuItems = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.id) {
      UserService.getUser(user.id).then((response) => {
        let unstyizedItems = response.data.jobPosition.menuItems;
        const mainItems = [];
        const subItemsMap = {};

        unstyizedItems.forEach((item) => {
          if (item.parentId) {
            if (!subItemsMap[item.parentId]) {
              subItemsMap[item.parentId] = [];
            }
            subItemsMap[item.parentId].push({
              title: item.title,
              path: item.path,
              sequence: item.sequence,
            });
          } else {
            mainItems.push({
              id: item.id,
              title: item.title,
              icon: item.icon,
              path: item.path,
              sequence: item.sequence,
            });
          }
        });

        const formattedMenu = mainItems.map((item) => {
          const subItems = subItemsMap[item.id];
          return {
            title: item.title,
            icon: item.icon,
            path: item.path,
            ...(subItems
              ? { subItems: subItems.sort((a, b) => a.sequence - b.sequence) }
              : {}),
            sequence: item.sequence,
          };
        });

        // Paso 3: Ordenar por `sequence`
        const finalMenu = formattedMenu
          .sort((a, b) => a.sequence - b.sequence)
          .map(({ sequence, ...rest }) => rest);

        setMenuItems(finalMenu);
      });
    }
    // AccessService.getAccess().then((response) => {
    //   setMenuItems(response.data);
    // });
  };

  useEffect(() => {
    //   requestPermission();
    //   getRegistrationToken();
    fetchMenuItems();
  }, []);

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
