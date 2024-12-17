import { useEffect, useState } from "react";
import { DefinitionList, Title } from "../../../components";
import PurchaseService from "../../../services/purchase.service";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { Accordion, AccordionTab } from "primereact/accordion";
import { getParseFloat } from "../../../utils";
import { useNavigate } from "react-router-dom";
import purchaseRequest from "../../../utils/pdf/purchaseRequest";

const PurchasesList = () => {
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();

  const headerTemplate = (
    supplierEmail,
    projectName,
    purchaseType,
    total,
    status
  ) => {
    return (
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="p-2" style={{ width: "60%" }}>
          <div className="fw-bold">
            {projectName || "Sin Proyecto"}{" "}
            {purchaseType ? (
              <span className="text-secondary"> - {purchaseType}</span>
            ) : (
              ""
            )}
          </div>
          <div className="text-secondary mt-2">{supplierEmail}</div>
        </div>

        <div className="text-end fw-bold p-2" style={{ width: "20%" }}>
          ${getParseFloat(total)}
        </div>

        <div className="text-end p-2" style={{ width: "20%" }}>
          <Badge bg="warning" className="ms-auto text-black">
            {status}
          </Badge>
        </div>
      </div>
    );
  };

  const bodyTemplate = (
    id,
    items,
    userName,
    supplierName,
    projectName,
    purchaseDescription,
    purchaseTypeName,
    total
  ) => {
    return (
      <>
        <DefinitionList
          definitions={[
            {
              title: "Elaborado por",
              description: userName,
            },
            {
              title: "Proveedor",
              description: supplierName,
            },
            {
              title: "Proyecto",
              description: projectName,
            },
            {
              title: "Descripcion",
              description: purchaseDescription,
            },
            {
              title: "Tipo de Compra",
              description: purchaseTypeName,
            },
          ]}
          
        />
        {items && (
          <>
            <hr />
            <h5>Materiales</h5>
            <div className="table-responsive-sm" id="materialTableSection">
              <table className="table align-middle table-hover table-sm table-responsive table-bordered border-black table-secondary">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Unidad</th>
                    <th>P/U</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.material.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit.abbreviation}</td>
                      <td>${getParseFloat(item.unit_price) || "N/A"}</td>
                      <td>${getParseFloat(item.total_ammount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h6>
              Total: $<span>{getParseFloat(total)}</span>
            </h6>
          </>
        )}
        <hr />
        <Row xs="auto">
          <Col>
            <Button variant="gd" onClick={() => handleView(id)}>
              Ver Mas <i className="bi bi-plus-lg" />
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  const handleView = (id) => {
    navigate(`/purchases/${id}`);
  };

  useEffect(() => {
    PurchaseService.getPurchases().then((response) => {
      setPurchases(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <>
      <Title title="Lista de Solicitudes de Compra" withReturnButton />
      <Accordion>
        {purchases.map((purchase) => (
          <AccordionTab
            header={headerTemplate(
              purchase.user?.email || "Sin identificar",
              purchase.supplier.fullName || purchase.supplier.legalName,
              purchase.purchaseType.name || "",
              purchase.total,
              "POR CONFIRMAR",
              purchase.purchaseType.name
            )}
          >
            {bodyTemplate(
              purchase.id,
              purchase.items,
              purchase.user
                ? `${purchase.user.firstName} ${
                    purchase.user.middleName || ""
                  } ${purchase.user.fatherLastName} ${
                    purchase.user.motherLastName
                  }`
                : "SIN IDENTIFICAR",
              purchase.supplier.fullName || purchase.supplier.legalName,
              purchase.project?.name,
              purchase.purchaseDescription,
              purchase.purchaseType.name,
              purchase.total
            )}
          </AccordionTab>
        ))}
      </Accordion>
    </>
  );
};

export default PurchasesList;
