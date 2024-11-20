import { useEffect, useState, useRef } from "react";
import $ from "jquery";
import { Title } from "../../../components";
import AccessService from "../../../services/access.service";

const MenuItemsList = () => {
  const [flattenedAccesses, setFlattenedAccesses] = useState([]);
  const tableRef = useRef();
  let dataTableInstance = useRef(null);

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
    });
  }, []);

  useEffect(() => {
    if (flattenedAccesses.length > 0) {
      if ($.fn.dataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      dataTableInstance.current = $(tableRef.current).DataTable({
        paging: false,
        ordering: true,
        info: true,
        searching: true,
      });
    }
  }, [flattenedAccesses]);

  return (
    <>
      <Title title="Lista de Items del Menú" withReturnButton />
      <div>
        <table
          ref={tableRef}
          className="display table table-striped"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Secuencia</th>
              <th>Icon</th>
              <th>Título</th>
              <th>Path</th>
            </tr>
          </thead>
          <tbody>
            {flattenedAccesses.map((access, index) => (
              <tr key={index}>
                <td>{access.sequence}</td>
                <td>
                  {access.icon && <i className={`bi bi-${access.icon}`} />}
                </td>
                <td>{access.title}</td>
                <td>{access.path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MenuItemsList;
