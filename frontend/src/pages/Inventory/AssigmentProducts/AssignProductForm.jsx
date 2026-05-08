import React, { useState, useEffect } from "react";
import { Title, ContentCard } from "../../../components";
import { Select, Input, TitleSection } from "../../../components/Form";
import SucursalService from "../../../services/sucursal.service";
import { Button, Col } from "react-bootstrap";

const AssignProductForm  = () => {
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);

  const [formData, setFormData] = useState({
    branchId: "",
    productId: "",
    variantId: "",
    quantity: "",
  });

   useEffect(() => {
     // Carga inicial de sucursales y productos

     const user = JSON.parse(localStorage.getItem( "user" ));

     SucursalService
      .getAllSucursales(user.companyId)
      .then( 
            (res) => {
                        console.log("response Sucursales:");
                        console.log(res.data);
                        setBranches(res.data); 
                      }
            );
     //axiosInstance.get("/branches").then((res) => setBranches(res.data));
     //axiosInstance.get("/products").then((res) => setProducts(res.data));
   }, []);

//   // Cargar variantes al seleccionar un producto
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.branchId || !formData.productId || !formData.variantId || !formData.quantity) {
      alert("Completa todos los campos");
      return;
    }

    try {
      //await axiosInstance.post(`/branches/${formData.branchId}/assign-product`, formData);
      alert("Producto asignado exitosamente a la sucursal");

      // Reinicia formulario
      setFormData({ branchId: "", productId: "", variantId: "", quantity: "" });
      setVariants([]);
    } catch (error) {
      console.error("Error al asignar producto:", error);
      alert("Error al asignar el producto");
    }
  };

  return (
    <>
      <Title title="Asignar Producto a Sucursal" withReturnButton />

      {/* Información previa si existiera */}
      {formData && (
        <ContentCard>
          <h5>Datos Actuales</h5>
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
          </ul>
        </ContentCard>
      )}

      {/* Sección principal del formulario */}
      <TitleSection id="dataSeccion" text="Datos Generales">
        <Select
          label="Sucursal"
          defaultOption="Seleccione una sucursal"
          name="branchId"
          value={formData.branchId}
          options={branches}
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

        <Input
          label="Cantidad"
          type="number"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        {/* <SubmitButton text="Asignar Producto" onClick={handleSubmit} /> */}
      </TitleSection>

      <Col>
        <hr />
        <Button
            type="button"
            variant="gd"
            onClick={() => window.confirm("¿Confirmar asignación?") && handleSubmit(event)}
            >
            Confirmar Asignación
        </Button>
      </Col>
    </>
  );

};

export default AssignProductForm;
