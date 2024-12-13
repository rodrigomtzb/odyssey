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
    supplierName,
    projectName,
    purchaseDescription,
    purchaseTypeName,
    total
  ) => {
    return (
      <>
        <div className="d-flex align-items-center ps-1 my-2">
          <span className="fs-5">{supplierName}</span>
          <span className="text-secondary ms-2"> - {purchaseTypeName}</span>
          <span className="text-secondary-subtle ms-1">
            ${getParseFloat(total)}
          </span>
          <Badge className="ms-auto bg-warning text-black">Por Autorizar</Badge>
        </div>
      </>
    );
  };
  const bodyTemplate = (
    id,
    items,
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
          <Col>
            <Button
              onClick={() =>
                purchaseRequest(
                  purchases.find((purchase) => purchase.id === id)
                )
              }
            >
              Generar PDF <i className="bi bi-filetype-pdf" />
            </Button>
          </Col>
          <Col>
            <Button variant="success" disabled>
              Generar Excel <i className="bi bi-filetype-xlsx" />
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
              purchase.supplier.fullName || purchase.supplier.legalName,
              "",
              "",
              purchase.purchaseType.name,
              purchase.total
            )}
          >
            {bodyTemplate(
              purchase.id,
              purchase.items,
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
