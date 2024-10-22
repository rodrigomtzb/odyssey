import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import "datatables.net-bs5";
import Input from "./Input";

const MaterialForm = () => {
  const [material, setMaterial] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [materialList, setMaterialList] = useState([]);
  const [autoCalculate, setAutoCalculate] = useState(true);
  const tableRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial({
      ...material,
      [name]: value,
    });
  };

  const addMaterial = () => {
    if (material.name && material.quantity) {
      const newMaterial = {
        ...material,
        id: Date.now(),
        subtotal: material.price ? material.quantity * material.price : "",
      };
      setMaterialList([...materialList, newMaterial]);
      setMaterial({ name: "", quantity: "", price: "" });
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

  useEffect(() => {
    if (tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [materialList]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <Input
            type="text"
            className="form-control"
            name="name"
            placeholder="Nombre del material"
            label="Nombre del material"
            value={material.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <Input
            type="number"
            className="form-control"
            name="quantity"
            placeholder="Cantidad"
            label="Cantidad"
            value={material.quantity}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <Input
            type="number"
            className="form-control"
            name="price"
            placeholder="Precio unitario"
            label="Precio unitario"
            value={material.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2 d-flex align-items-center justify-content-center">
          <button
            type="button"
            className="btn btn-success"
            onClick={addMaterial}
            disabled={!material.name || !material.quantity}
          >
            <i className="bi bi-plus-lg" />
          </button>
        </div>
      </div>

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
        {materialList.length > 0 ? (
          <table className="table" ref={tableRef}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio por unidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materialList.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <div className="text-end">{item.price || "N/A"}</div>
                  </td>
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
        ) : (
          <p>No se han agregado materiales.</p>
        )}
      </div>

      {materialList.length > 0 && (
        <div className="mt-4 row">
          <div className="col-2 d-flex align-items-center justify-content-end">
            <h5>Total: $</h5>
          </div>
          <div className="col-3">
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
    </div>
  );
};

export default MaterialForm;
