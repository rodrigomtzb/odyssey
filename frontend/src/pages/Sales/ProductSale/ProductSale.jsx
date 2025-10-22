import React, { useEffect, useState } from "react";
//import axiosInstance from "../../api/axiosConfig";
import { Title, ContentCard } from "../../../components";
import { Select, Input, TitleSection } from "../../../components/Form";
import { Button, Col } from "react-bootstrap";

const ProductSale = () => {
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [stock, setStock] = useState(null);
  const [loadingStock, setLoadingStock] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [formData, setFormData] = useState({
    branchId: "",
    productId: "",
    variantId: "",
    quantity: "",
    customerName: "",
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

  // Consultar stock actual
  const checkStock = async () => {
    if (!formData.branchId || !formData.variantId) {
      alert("Selecciona la sucursal y la variante");
      return;
    }
   // setLoadingStock(true);
    // try {
    //   const res = await axiosInstance.get(
    //     `/branches/${formData.branchId}/stock/${formData.variantId}`
    //   );
    //   setStock(res.data.stock || 0);
    // } catch (err) {
    //   console.error("Error al obtener stock:", err);
    //   setStock(0);
    // } finally {
    //   setLoadingStock(false);
    // }
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
    if (!formData.branchId || !formData.variantId || !formData.quantity) {
      alert("Completa todos los campos obligatorios");
      return;
    }
    if (stock === null) {
      alert("Debes consultar el stock antes de vender");
      return;
    }
    if (parseInt(formData.quantity) > stock) {
      alert("No hay suficiente stock disponible en la sucursal seleccionada");
      return;
    }
    setConfirmVisible(true);
  };

  const executeSale = async () => {
    // try {
    //   await axiosInstance.post("/sales", formData);
    //   alert("Venta registrada correctamente");

    //   setFormData({
    //     branchId: "",
    //     productId: "",
    //     variantId: "",
    //     quantity: "",
    //     customerName: "",
    //   });
    //   setVariants([]);
    //   setStock(null);
    //   setConfirmVisible(false);
    // } catch (error) {
    //   console.error("Error al registrar venta:", error);
    //   alert("Error al registrar la venta");
    // }
  };

  return (
    <>
      <Title title="Registro de Venta" withReturnButton />

      {/* Datos actuales */}
      {formData && (
        <ContentCard>
          <h5>Resumen de la Venta</h5>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Sucursal:</strong>{" "}
              {branches.find((b) => b.id === formData.branchId)?.name || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Producto:</strong>{" "}
              {products.find((p) => p.id === formData.productId)?.name || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Variante:</strong>{" "}
              {variants.find((v) => v.id === formData.variantId)
                ? `${variants.find((v) => v.id === formData.variantId).color} / ${
                    variants.find((v) => v.id === formData.variantId).size
                  }`
                : "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Cantidad:</strong> {formData.quantity || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Cliente:</strong>{" "}
              {formData.customerName ? formData.customerName : "No especificado"}
            </li>
            {stock !== null && (
              <li className="list-group-item">
                <strong>Stock disponible:</strong> {stock} unidades
              </li>
            )}
          </ul>
        </ContentCard>
      )}

      {/* Formulario principal */}
      <TitleSection id="saleForm" text="Datos Generales">
        <Select
          label="Sucursal"
          defaultOption="Seleccione una sucursal"
          name="branchId"
          value={formData.branchId}
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

        <Button
          type="button"
          variant="secondary"
          onClick={checkStock}
          disabled={!formData.branchId || !formData.variantId}
        >
          {loadingStock ? "Consultando..." : "Consultar Stock"}
        </Button>

        <Input
          label="Cantidad a vender"
          type="number"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <Input
          label="Cliente (opcional)"
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Nombre del cliente"
        />
      </TitleSection>

      <Col>
        <hr />
        <Button
          type="button"
          variant="gd"
          onClick={() => handleConfirm()}
        >
          Confirmar Venta
        </Button>
      </Col>

      {/* Modal de confirmación */}
      {confirmVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar Venta</h3>
            <p>
              ¿Deseas registrar la venta de{" "}
              <strong>{formData.quantity}</strong> unidades en la sucursal{" "}
              <strong>
                {branches.find((b) => b.id === parseInt(formData.branchId))?.name}
              </strong>
              ?
            </p>
            <div className="modal-actions">
              <Button variant="secondary" onClick={executeSale}>
                Sí, registrar venta
              </Button>
              <Button variant="gd" onClick={() => setConfirmVisible(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSale;
