import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "./Input";
import Select from "./Select";
import { Button, Col, Row } from "react-bootstrap";
import { handleFormChange } from "../../utils";
import TitleSection from "./TitleSection";

const MaterialForm = ({ setFormData }) => {
  const [materialList, setMaterialList] = useState([]);
  const [isvisible, setIsVisible] = useState(true);
  const [autoCalculate, setAutoCalculate] = useState(true);
  const [total, setTotal] = useState(0);
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

  // Opciones para la unidad CATALOGO
  const unitOptions = [
    { id: 1, name: "Kilogramo" },
    { id: 2, name: "Metro" },
    { id: 3, name: "Pieza" },
    { id: 4, name: "Litro" },
  ];

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
        index === i ? { ...item, totalAmmount: value } : item
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
      setTotal(tot.toFixed(2));
    }
  }, [materialList, autoCalculate]);

  return (
    <>
      <TitleSection text="Materiales" state={isvisible}>
        <Row>
          <Col>
            <Input
              type="text"
              className="form-control"
              name="name"
              placeholder="Nombre del material"
              label="Nombre del material"
              value={material.name}
              onChange={handleFormChange(material, setMaterial)}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <Input
              type="number"
              className="form-control"
              name="quantity"
              placeholder="100"
              label="Cantidad"
              value={item.quantity}
              onChange={handleFormChange(item, setItem)}
            />
          </Col>
          <Col lg={3}>
            <Select
              label="Unidad"
              defaultOption="Selecciona una unidad"
              name="unitId"
              options={unitOptions}
              value={item.unitId}
              onChange={handleFormChange(item, setItem)}
            />
          </Col>
          <Col lg={3}>
            <Input
              type="number"
              className="form-control"
              name="unitPrice"
              placeholder="$100"
              label="P/U"
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
                          item.totalAmmount
                        ) : (
                          <input
                            type="number"
                            className="form-control"
                            value={item.totalAmmount}
                            onChange={(e) =>
                              handleSubtotalChange(index, e.target.value)
                            }
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
                    total
                  ) : (
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Ingrese el total manualmente"
                      name="total"
                      value={total}
                      onChange={handleFormChange(total, setTotal)}
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
