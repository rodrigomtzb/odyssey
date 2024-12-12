import React, { useState, useEffect } from "react";
import Input from "./Input";
import Select from "./Select";
import { Button, Col, Row } from "react-bootstrap";
import { getParseFloat, handleFormChange } from "../../utils";
import TitleSection from "./TitleSection";
import CatalogsService from "../../services/catalogs.service";
import SearchInput from "./SearchInput";

const MaterialForm = ({ setFormData }) => {
  const [unit, setUnit] = useState();
  const [materialList, setMaterialList] = useState([]);
  const [isvisible, setIsVisible] = useState(true);
  const [autoCalculate, setAutoCalculate] = useState(true);
  const [total, setTotal] = useState(0);
  const [unitsMeasure, setUnitsMeasure] = useState();
  const [material, setMaterial] = useState({
    id: "",
    name: "",
  });
  const [item, setItem] = useState({
    quantity: "",
    unitId: "",
    unitPrice: "",
    totalAmmount: "",
  });

  const addMaterial = () => {
    if (material.name && item.quantity && item.unitId) {
      const newMaterial = {
        ...item,
        material: material,
        totalAmmount: item.unitPrice ? item.quantity * item.unitPrice : "",
      };
      setMaterialList((prevList) => [...prevList, newMaterial]);
      setMaterial({ name: "", id: "" });
      setItem({ quantity: "", unitId: "", unitPrice: "" });
    }
  };
  const handleSubtotalChange = (i, value) => {
    setMaterialList((prevList) =>
      prevList.map((item, index) =>
        index === i ? { ...item, totalAmmount: getParseFloat(value) } : item
      )
    );
  };
  const handleAddMaterials = () => {
    setIsVisible(false);

    setFormData({ materials: materialList, total: total });
  };
  const removeMaterial = (id) => {
    setMaterialList((prevList) =>
      prevList.filter((item, index) => index !== id)
    );
  };

  useEffect(() => {
    if (autoCalculate) {
      const tot = materialList.reduce(
        (total, item) =>
          total + (item.totalAmmount ? parseFloat(item.totalAmmount) : 0),
        0
      );
      setTotal(Number(tot.toFixed(2)));
    }
  }, [materialList, autoCalculate]);

  useEffect(() => {
    if (item.unitId) {
      setUnit(unitsMeasure.find((unit) => unit.id === item.unitId));
    }
  }, [item.unitId]);
  useEffect(() => {
    CatalogsService.getUnitMeasure().then((response) => {
      setUnitsMeasure(response.data);
    });
  }, []);

  return (
    <>
      <TitleSection text="Materiales" state={isvisible}>
        <Row>
          <Col>
            <Input
              label="Nombre del material"
              name="name"
              className="form-control"
              placeholder="Nombre del material"
              regexType="letters-and-space"
              value={material.name}
              onChange={handleFormChange(material, setMaterial)}
            />
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <SearchInput
              label="Busqueda"
              name="name"
              placeholder="Nombre"
              value={material.name}
              onChange={handleFormChange(material, setMaterial)}
            />
          </Col>
        </Row> */}
        <Row>
          <Col lg={3}>
            <Input
              type="number"
              label="Cantidad"
              name="quantity"
              className="form-control"
              regexType="only-numbers"
              placeholder="100"
              value={item.quantity}
              suffix={unit ? ` ${unit.abbreviation}` : ""}
              onChange={handleFormChange(item, setItem)}
            />
          </Col>
          <Col lg={3}>
            <Select
              label="Unidad"
              defaultOption="Selecciona una unidad"
              name="unitId"
              options={unitsMeasure}
              value={item.unitId}
              onChange={handleFormChange(item, setItem)}
            />
          </Col>
          <Col lg={3}>
            <Input
              type="money"
              label="P/U"
              name="unitPrice"
              className="form-control"
              placeholder="$100"
              value={item.unitPrice}
              onChange={handleFormChange(item, setItem)}
            />
          </Col>
          <Col
            xs={3}
            md={2}
            className="d-flex align-items-center justify-content-center mt-3"
          >
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={addMaterial}
              disabled={!material.name || !item.quantity || !item.unitId}
            >
              <i className="bi bi-plus-lg" />
            </button>
          </Col>
        </Row>

        <div className="mt-3">
          <label>
            <input
              type="checkbox"
              checked={autoCalculate}
              onChange={() => setAutoCalculate(!autoCalculate)}
            />{" "}
            Calcular total automáticamente
          </label>
        </div>

        <div className="mt-4">
          <h5>Materiales Agregados</h5>
          <hr />
          {materialList.length > 0 ? (
            <div className="table-responsive-sm" id="materialTableSection">
              <table className="table align-middle table-hover table-sm table-responsive table-bordered border-black table-secondary">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Unidad</th>
                    <th>P/U</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {materialList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.material.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unitId}</td>
                      <td>{item.unitPrice || "N/A"}</td>
                      <td>
                        {item.unitPrice ? (
                          `$${getParseFloat(item.totalAmmount)}`
                        ) : (
                          <Input
                            type="money"
                            value={item.totalAmmount}
                            placeholder="$999.99"
                            onChange={(e) =>
                              handleSubtotalChange(index, e.target.value)
                            }
                            withoutLabel
                            withoutClasses
                          />
                        )}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeMaterial(index)}
                          >
                            <i className="bi bi-trash-fill" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No se han agregado materiales.</p>
          )}
        </div>

        {materialList.length > 0 && (
          <>
            <div className="mt-4 row">
              <div className="col-4 d-flex align-items-center justify-content-end">
                <h5>Total: $</h5>
              </div>
              <div className="col-6">
                <h5>
                  {autoCalculate ? (
                    getParseFloat(total)
                  ) : (
                    <Input
                      type="money"
                      placeholder="$999.99"
                      name="total"
                      value={total}
                      onChange={handleFormChange(total, setTotal)}
                      withoutClasses
                      withoutLabel
                    />
                  )}
                </h5>
              </div>
            </div>
            <hr />
            <Button
              variant="gd"
              className="ms-auto"
              onClick={handleAddMaterials}
            >
              Agregar
            </Button>
          </>
        )}
      </TitleSection>
    </>
  );
};

export default MaterialForm;
