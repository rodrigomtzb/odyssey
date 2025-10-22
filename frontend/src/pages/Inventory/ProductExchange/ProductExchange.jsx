import React, { useEffect, useState } from "react";
//import axiosInstance from "../../api/axiosConfig";
import { Title, ContentCard } from "../../../components";
import { Select, Input, TitleSection } from "../../../components/Form";
import { Button, Col } from "react-bootstrap";

const ProductExchange = () => {
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [stock, setStock] = useState(null);
  const [loadingStock, setLoadingStock] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [formData, setFormData] = useState({
    originBranchId: "",
    targetBranchId: "",
    productId: "",
    variantId: "",
    quantity: "",
  });

//   useEffect(() => {
//     axiosInstance.get("/branches").then((res) => setBranches(res.data));
//     axiosInstance.get("/products").then((res) => setProducts(res.data));
//   }, []);

//   useEffect(() => {
//     if (formData.productId) {
//       axiosInstance
//         .get(`/products/${formData.productId}/variants`)
//         .then((res) => setVariants(res.data))
//         .catch(() => setVariants([]));
//     } else {
//       setVariants([]);
//     }
//   }, [formData.productId]);

  const checkStock = async () => {
    if (!formData.originBranchId || !formData.variantId) {
      alert("Selecciona la sucursal de origen y la variante");
      return;
    }
    setLoadingStock(true);
    try {
      const res = await axiosInstance.get(
        `/branches/${formData.originBranchId}/stock/${formData.variantId}`
      );
      setStock(res.data.stock || 0);
    } catch (err) {
      console.error("Error al obtener stock:", err);
      setStock(0);
    } finally {
      setLoadingStock(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "productId") {
      setVariants([]);
      setStock(null);
    }
  };

  const handleConfirm = () => {
    if (
      !formData.originBranchId ||
      !formData.targetBranchId ||
      !formData.variantId ||
      !formData.quantity
    ) {
      alert("Completa todos los campos antes de continuar");
      return;
    }
    if (formData.originBranchId === formData.targetBranchId) {
      alert("La sucursal de origen y destino deben ser diferentes");
      return;
    }
    if (stock === null) {
      alert("Debes consultar el stock antes de transferir");
      return;
    }
    if (parseInt(formData.quantity) > stock) {
      alert("No hay suficiente stock disponible en la sucursal de origen");
      return;
    }

    setConfirmVisible(true);
  };

  const executeTransfer = async () => {
    try {
      await axiosInstance.post("/branches/exchange", formData);
      alert("Transferencia realizada correctamente");

      setFormData({
        originBranchId: "",
        targetBranchId: "",
        productId: "",
        variantId: "",
        quantity: "",
      });
      setVariants([]);
      setStock(null);
      setConfirmVisible(false);
    } catch (error) {
      console.error("Error al transferir producto:", error);
      alert("Error al transferir el producto");
    }
  };

  return (
    <>
      <Title title="Intercambio de Productos entre Sucursales" withReturnButton />

      <ContentCard>
        <h5>Resumen de Transferencia</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Origen:</strong>{" "}
            {branches.find((b) => b.id === parseInt(formData.originBranchId))?.name || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Destino:</strong>{" "}
            {branches.find((b) => b.id === parseInt(formData.targetBranchId))?.name || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Producto:</strong>{" "}
            {products.find((p) => p.id === parseInt(formData.productId))?.name || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Variante:</strong>{" "}
            {variants.find((v) => v.id === parseInt(formData.variantId))
              ? `${variants.find((v) => v.id === parseInt(formData.variantId)).color} / ${
                  variants.find((v) => v.id === parseInt(formData.variantId)).size
                }`
              : "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Cantidad:</strong> {formData.quantity || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Stock disponible:</strong>{" "}
            {stock !== null ? `${stock} unidades` : "No consultado"}
          </li>
        </ul>
      </ContentCard>

      <TitleSection id="transferData" text="Datos de Transferencia">
        <Select
          label="Sucursal Origen"
          defaultOption="Seleccione una sucursal"
          name="originBranchId"
          value={formData.originBranchId}
          options={branches.map((b) => ({ id: b.id, name: b.name }))}
          onChange={handleChange}
          required
        />

        <Select
          label="Sucursal Destino"
          defaultOption="Seleccione una sucursal"
          name="targetBranchId"
          value={formData.targetBranchId}
          options={branches.map((b) => ({ id: b.id, name: b.name }))}
          onChange={handleChange}
          required
        />

        <Select
          label="Producto"
          defaultOption="Seleccione un producto"
          name="productId"
          value={formData.productId}
          options={products.map((p) => ({ id: p.id, name: p.name }))}
          onChange={handleChange}
          required
        />

        <Select
          label="Variante"
          defaultOption="Seleccione una variante"
          name="variantId"
          value={formData.variantId}
          options={variants.map((v) => ({
            id: v.id,
            name: `${v.color} / ${v.size} — $${v.unitPrice}`,
          }))}
          onChange={handleChange}
          required
        />

        <Col className="mb-3">
          <Button
            variant="secondary"
            onClick={checkStock}
            disabled={!formData.originBranchId || !formData.variantId}
          >
            {loadingStock ? "Consultando..." : "Consultar Stock"}
          </Button>
        </Col>

        <Input
          label="Cantidad a transferir"
          type="number"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </TitleSection>

      <Col>
        <hr />
        <Button type="button" variant="gd" onClick={handleConfirm}>
          Confirmar Transferencia
        </Button>
      </Col>

      {/* Modal de confirmación */}
      {confirmVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar Transferencia</h3>
            <p>
              ¿Deseas transferir <strong>{formData.quantity}</strong> unidades
              de este producto desde{" "}
              <strong>
                {
                  branches.find((b) => b.id === parseInt(formData.originBranchId))
                    ?.name
                }
              </strong>{" "}
              hacia{" "}
              <strong>
                {
                  branches.find((b) => b.id === parseInt(formData.targetBranchId))
                    ?.name
                }
              </strong>
              ?
            </p>
            <div className="modal-actions d-flex justify-content-end gap-2 mt-3">
              <Button variant="gd" onClick={executeTransfer}>
                Sí, transferir
              </Button>
              <Button variant="secondary" onClick={() => setConfirmVisible(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductExchange;
