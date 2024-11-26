import { TableCell, TableRow } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import CatalogsService from "../services/catalogs.service";
import TableBase from "./TableBase";

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
    CatalogsService.getPersonType().then((response) =>
      setPersonTypeCatalog(response.data)
    );
  }, []);
  return (
    <>
      <TableBase
        titles={[
          "Razón Social/Nombre Comercial",
          "RFC",
          "Tipo de Persona",
          "Estado",
        ]}
        dataKey={["legalName", "mxRfc", "personType", "Estado"]}
      >
        {elements.map((element, index) => (
          <TableRow
            key={element.id}
            sx={{
              backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
              "&:hover": { backgroundColor: "#e0f7fa" },
              borderBottom: "2px solid #ddd",
            }}
          >
            <TableCell>
              <div className="d-flex flex-column">
                {element.personType === "M" ? (
                  <>
                    <Link
                      onClick={() => handleView(element.id)}
                      className="text-decoration-none text-body"
                    >
                      <p className="fw-bold mb-1">{element.legalName}</p>
                    </Link>
                    <p className="text-muted mb-0">{element.businessName}</p>
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
            </TableCell>
            <TableCell>
              {element.personType == "M" ? element.mxRfcCompany : element.mxRfc}
            </TableCell>
            <TableCell>
              {getPersonTypeDescription(element.personType)}
            </TableCell>
            <TableCell>
              {element.enabled ? (
                <Badge bg="success">Activo</Badge>
              ) : (
                <Badge bg="danger">Inactivo</Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBase>
    </>
  );
};

export default TaxList;
