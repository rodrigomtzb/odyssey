import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const DataTable = ({
  paging = true,
  ordering = true,
  info = true,
  searching = true,
  children,
  data = [],
  titleCol,
  dataKey,
  viewConfig = {
    key: "",
    to: "",
  },
}) => {
  const navigate = useNavigate();
  const tableRef = useRef("dataTable");

  const handleView = (id) => {
    navigate(`/${viewConfig.to}/${id}`);
  };

  return (
    <div>
      <table
        ref={tableRef}
        id="dataTable"
        className="display"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            {titleCol.map((title, index) => (
              <th key={`${title}${index}`}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!children
            ? data.map((d, index) => (
                <tr key={`${d.id}${index}`}>
                  {dataKey.map((key, index) =>
                    key === viewConfig.key ? (
                      <td key={`${key}${index}`}>
                        <Link
                          onClick={() => handleView(d.id)}
                          className="text-decoration-none text-body"
                        >
                          <p className="fw-bold mb-0">{d[key]}</p>
                        </Link>
                      </td>
                    ) : (
                      <td key={`${key}${index}`}>{d[key]}</td>
                    )
                  )}
                </tr>
              ))
            : children}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
