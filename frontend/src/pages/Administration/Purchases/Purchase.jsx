import { useParams } from "react-router-dom";
import { ContentCard, DefinitionList, Title } from "../../../components";
import { useEffect, useRef, useState } from "react";
import PurchaseService from "../../../services/purchase.service";
import { getParseFloat } from "../../../utils";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";

const PurchaseDetails = () => {
  const { id } = useParams();
  const [purchase, setPurchase] = useState();
  const [items, setItems] = useState();
  const [definitionData, setDefinitionData] = useState([]);
  const stepperRef = useRef(null);

  useEffect(() => {
    if (purchase) {
      const definitions = [
        {
          title: "Proveedor",
          description:
            purchase.supplier.fullName || purchase.supplier.legalName,
        },
        {
          title: "Proyecto",
          description: purchase.project?.name,
        },
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
      setItems(purchase.items);
    }
  }, [purchase]);
  useEffect(() => {
    PurchaseService.getPurchase(id).then((response) => {
      setPurchase(response.data);
      console.log(response.data);
    });
  }, [id]);
  return (
    <>
      <Title title="Detalles de Solicitud" withReturnButton />
      <ContentCard>
        <DefinitionList definitions={definitionData} />
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
              Total: $<span>{getParseFloat(purchase.total)}</span>
            </h6>
          </>
        )}
        <hr />
        <Stepper ref={stepperRef} headerPosition="bottom">
          <StepperPanel header="Por Autorizar"></StepperPanel>
          <StepperPanel header="Autorizado"></StepperPanel>
          <StepperPanel header="Comprado"></StepperPanel>
        </Stepper>
      </ContentCard>
    </>
  );
};

export default PurchaseDetails;
