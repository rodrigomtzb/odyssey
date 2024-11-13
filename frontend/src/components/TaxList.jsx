import $ from "jquery";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import { useEffect, useState } from "react";
import CatalogsService from "../services/catalogs.service";
import { Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
DataTable.use(DT);

const TaxList = ({ elements, type }) => {
  const navigate = useNavigate();
  const [personTypeCatalog, setPersonTypeCatalog] = useState([]);

  const getPersonTypeDescription = (type) => {
    const person = personTypeCatalog.find((item) => item.type === type);
    return person ? person.description : "Tipo desconocido";
  };

  const handleView = (id) => {
    switch (type) {
      case "supplier":
        navigate(`/providers/${id}`);
        break;
      case "customer":
        navigate(`/customers/${id}`);
        break;
    }
  };

  useEffect(() => {
    if (elements.length > 0) {
      const table = $("#taxTable").DataTable();

      return () => {
        if ($.fn.dataTable.isDataTable("#taxTable")) {
          table.destroy();
        }
      };
    }
  }, [elements]);

  useEffect(() => {
    CatalogsService.getPersonType().then((response) =>
      setPersonTypeCatalog(response.data)
    );
  }, []);
  return (
    <>
      <div className="table-responsive">
        <table id="taxTable" className="display table">
          <thead>
            <tr>
              <th>Razón Social/Nombre Comercial</th>
              <th>RFC</th>
              <th>Tipo de Persona</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {elements.map((element) => (
              <tr key={element.id}>
                <td>
                  <div className="d-flex flex-column">
                    {element.personType === "M" ? (
                      <>
                        <Link
                          onClick={() => handleView(element.id)}
                          className="text-decoration-none text-body"
                        >
                          <p className="fw-bold mb-1">{element.legalName}</p>
                        </Link>
                        <p className="text-muted mb-0">
                          {element.businessName}
                        </p>
                      </>
                    ) : (
                      <Link
                        onClick={() => handleView(element.id)}
                        className="text-decoration-none text-body"
                      >
                        <p className="fw-bold mb-1">{element.fullName}</p>
                      </Link>
                    )}
                  </div>
                </td>
                <td>
                  {element.personType == "M"
                    ? element.mxRfcCompany
                    : element.mxRfc}
                </td>
                <td>{getPersonTypeDescription(element.personType)}</td>
                <td>
                  {element.enabled ? (
                    <Badge bg="success">Activo</Badge>
                  ) : (
                    <Badge bg="danger">Inactivo</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaxList;
