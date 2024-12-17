import { useParams } from "react-router-dom";
import {
  ContentCard,
  DefinitionList,
  MaterialTable,
  Title,
} from "../../../components";
import { useEffect, useRef, useState } from "react";
import PurchaseService from "../../../services/purchase.service";
import { getBankData, getTaxData } from "../../../utils";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import AddressDetails from "../../../components/AddressDetails";
import purchaseRequest from "../../../utils/pdf/purchaseRequest";
import { Button, Col, Row } from "react-bootstrap";

const PurchaseDetails = () => {
  const { id } = useParams();
  const [purchase, setPurchase] = useState();
  const [definitionData, setDefinitionData] = useState([]);
  const stepperRef = useRef(null);

  useEffect(() => {
    if (purchase) {
      const definitions = [
        {
          title: "Descripcion",
          description: purchase.purchaseDescription,
        },
        {
          title: "Tipo de Compra",
          description: purchase.purchaseType.name,
        },
      ];
      setDefinitionData(definitions);
      console.log(purchase);
    }
  }, [purchase]);
  useEffect(() => {
    PurchaseService.getPurchase(id).then((response) => {
      setPurchase(response.data);
    });
  }, [id]);
  return (
    <>
      <Title title="Detalles de Solicitud" withReturnButton />
      {/* <DefinitionList definitions={definitionData} /> */}
      {purchase && (
        <>
          <ContentCard>
            <h4>Datos del Proveedor</h4>
            <DefinitionList definitions={getTaxData(purchase.supplier, true)} />
            {purchase.supplier.bankAccounts.length > 0 &&
              purchase.supplier.bankAccounts.map((bankAccount, index) => (
                <>
                  <hr />
                  <h5>Datos Bancarios {index > 0 ? index + 1 : ""}</h5>
                  <DefinitionList
                    definitions={getBankData(bankAccount, true)}
                  />
                </>
              ))}
            {purchase.supplier.address.length > 0 &&
              purchase.supplier.address.map((address, index) => (
                <AddressDetails key={index} address={address} index={index} />
              ))}
          </ContentCard>
          <ContentCard>
            <MaterialTable items={purchase.items} total={purchase.total} />
          </ContentCard>
        </>
      )}
      <Row xs="auto">
        <Col>
          <Button onClick={() => purchaseRequest(purchase)}>
            Generar PDF <i className="bi bi-filetype-pdf" />
          </Button>
        </Col>
        {/* <Col>
            <Button variant="success" disabled>
              Generar Excel <i className="bi bi-filetype-xlsx" />
            </Button>
          </Col> */}
      </Row>
      {/* <hr />
      <Stepper ref={stepperRef} headerPosition="bottom">
        <StepperPanel header="Por Autorizar"></StepperPanel>
        <StepperPanel header="Autorizado"></StepperPanel>
        <StepperPanel header="Comprado"></StepperPanel>
      </Stepper> */}
    </>
  );
};

export default PurchaseDetails;
