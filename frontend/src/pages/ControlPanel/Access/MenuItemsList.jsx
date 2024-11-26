import { useEffect, useState, useRef } from "react";
import { Title } from "../../../components";
import AccessService from "../../../services/access.service";
import TableBase from "../../../components/TableBase";

const MenuItemsList = () => {
  const [flattenedAccesses, setFlattenedAccesses] = useState([]);

  useEffect(() => {
    AccessService.getAllAccess().then((response) => {
      const data = response.data;
      const flattened = data
        .map((item) => {
          const baseItem = {
            sequence: item.sequence,
            icon: item.icon,
            title: item.title,
            path: item.path || "N/A",
          };
          const items = [baseItem];
          if (item.subItems && item.subItems.length > 0) {
            item.subItems.forEach((subItem) => {
              items.push({
                sequence: item.sequence,
                icon: "caret-right-fill",
                title: subItem.title,
                path: subItem.path || "N/A",
              });
            });
          }

          return items;
        })
        .flat()
        .sort((a, b) => a.sequence - b.sequence);

      setFlattenedAccesses(flattened);
      console.log(flattened);
    });
  }, []);

  return (
    <>
      <Title title="Lista de Items del Menú" withReturnButton />
      <TableBase
        data={flattenedAccesses}
        titles={["Secuencia", "Icono", "Título", "Path"]}
        dataKey={["sequence", "icon", "title", "path"]}
      />
    </>
  );
};

export default MenuItemsList;
