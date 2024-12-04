import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "./Input";
import Select from "./Select";
import { Col, Row } from "react-bootstrap";
import { handleFormChange } from "../../utils";

const MaterialForm = ({ material, setMaterial }) => {
  const [materialList, setMaterialList] = useState([]);
  const [autoCalculate, setAutoCalculate] = useState(true);

  // Opciones para la unidad CATALOGO
  const unitOptions = [
    { id: "kg", name: "Kilogramo" },
    { id: "m", name: "Metro" },
    { id: "pieza", name: "Pieza" },
    { id: "litro", name: "Litro" },
  ];

  const addMaterial = () => {
    if (material.name && material.quantity && material.unit) {
      const newMaterial = {
        ...material,
        id: Date.now(),
        subtotal: material.price ? material.quantity * material.price : "",
      };
      setMaterialList([...materialList, newMaterial]);
      setMaterial({ name: "", quantity: "", price: "", unit: "" });
    }
  };

  const handleSubtotalChange = (id, value) => {
    setMaterialList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, subtotal: value } : item
      )
    );
  };

  const calculateTotal = () => {
    return materialList.reduce(
      (total, item) => total + (item.subtotal ? parseFloat(item.subtotal) : 0),
      0
    );
  };

  const removeMaterial = (id) => {
    setMaterialList(materialList.filter((item) => item.id !== id));
  };

  return (
    <>
      <Row>
        <Col lg={4}>
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
        <Col lg={2}>
          <Input
            type="number"
            className="form-control"
            name="quantity"
            placeholder="100"
            label="Cantidad"
            value={material.quantity}
            onChange={handleFormChange(material, setMaterial)}
          />
        </Col>
        <Col lg={3}>
          <Select
            label="Unidad"
            defaultOption="Selecciona una unidad"
            name="unit"
            options={unitOptions}
            value={material.unit}
            onChange={handleFormChange(material, setMaterial)}
          />
        </Col>
        <Col lg={2}>
          <Input
            type="number"
            className="form-control"
            name="price"
            placeholder="$100"
            label="P/U"
            value={material.price}
            onChange={handleFormChange(material, setMaterial)}
          />
        </Col>
        <Col
          lg={1}
          className="d-flex align-items-center justify-content-center"
        >
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={addMaterial}
            disabled={!material.name || !material.quantity || !material.unit}
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
                {materialList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{item.price || "N/A"}</td>
                    <td>
                      {item.price ? (
                        item.subtotal
                      ) : (
                        <input
                          type="number"
                          className="form-control"
                          value={item.subtotal}
                          onChange={(e) =>
                            handleSubtotalChange(item.id, e.target.value)
                          }
                        />
                      )}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeMaterial(item.id)}
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
        <div className="mt-4 row">
          <div className="col-4 d-flex align-items-center justify-content-end">
            <h5>Total: $</h5>
          </div>
          <div className="col-6">
            <h5>
              {autoCalculate ? (
                calculateTotal().toFixed(2)
              ) : (
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ingrese el total manualmente"
                />
              )}
            </h5>
          </div>
        </div>
      )}
    </>
  );
};

export default MaterialForm;
