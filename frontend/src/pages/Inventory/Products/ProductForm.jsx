import React, { useState, useEffect } from "react";
import ProductService from "../../../services/product.service";
import { ContentCard, DefinitionList, Title } from "../../../components";
import { Input, Select, TitleSection } from "../../../components/Form";
import { Button, Col, Form, Row } from "react-bootstrap";

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [variant, setVariant] = useState({
    color: "",
    size: "",
    costUnit: "",
    unitPrice: "",
    enabled: true,
  });

  const [product, setProduct] = useState({
    code: "",
    name: "",
    description: "",
    productId: "",
    categoryId: "",
    enabled: true,
  });

 useEffect(() => {
   ProductService
    .getAllCategoriesProducts()
      .then( (res)=>{
        console.log(res);
        setCategories(res.data);
    });

  }, []);


  const handleCategoryChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(e.target);

    ProductService
      .getAllProductsByCategoryId(value)
      .then( (res) => {
        console.log(res.data);
        setProducts(res.data)
      });
  
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });

    ProductService
      .getProductById(product.categoryId,value)
      .then(( res )=>{
          console.log(res.data);
          const { code, name, description } = res.data;

          setProduct((prevState) => ({
            ...prevState,
            code,
            name,
            description
          }));

          console.log("product");
          console.log(product);

      });
  };

  

  const handleVariantChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setVariant({
      ...variant,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addVariant = () => {
    if (!variant.color || !variant.size || !variant.unitPrice) {
      alert("Completa los datos de la variante antes de agregarla");
      return;
    }
    setVariants([...variants, variant]);
    setVariant({
      color: "",
      size: "",
      costUnit: "",
      unitPrice: "",
      enabled: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...product,
      variants: variants,
    };

    /*try {
      await axiosInstance.post("/products", payload);
      alert("Producto registrado con éxito");
      setProduct({ code: "", name: "", description: "", categoryId: "", enabled: true });
      setVariants([]);
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      alert("Error al registrar el producto");
    }*/
  };

  return (
    <>
    <Title
      title={
         "Registro de Producto"}
      withReturnButton
    />
  
    {product && (
      <ContentCard>
        <Row>
          <Col sm={10}>
            <h5>Datos Generales del Producto</h5>
            <DefinitionList
              definitions={[
                { label: "Código", value: product.code },
                { label: "Nombre", value: product.name },
                { label: "Categoría", value: product.categoryName },
                { label: "Activo", value: product.enabled ? "Sí" : "No" },
              ]}
            />
          </Col>
          <Col
            sm={2}
            className="d-flex justify-content-center align-items-center"
          >
            <Button variant="gd" onClick={() => handleEdit()}>
              <i className="bi bi-pencil-square" />
            </Button>
          </Col>
        </Row>
      </ContentCard>
    )}
  
    {/* Sección de formulario */}
    <TitleSection id="dataSection" text="Datos del Producto" isFirst>
      <Form>

      <Select
          label="Categoría"
          name="categoryId"
          value={product.categoryId}
          onChange={handleCategoryChange}
          options={categories}
          required
        />

      <Select
          label="Producto"
          name="productId"
          value={product.productId}
          onChange={handleProductChange}
          options={products}
          required
        />

        <Input
          label="Código"
          placeholder="Ingresa el código del producto"
          name="code"
          value={product.code}
          onChange={handleProductChange}
          required
        />
  
        <Input
          label="Nombre"
          placeholder="Nombre del producto"
          name="name"
          value={product.name}
          onChange={handleProductChange}
          required
        />
  
        <Input
          type="textarea"
          label="Descripción"
          placeholder="Descripción del producto"
          name="description"
          value={product.description}
          onChange={handleProductChange}
        />
  
        {/* <CheckBox
          label="Habilitado"
          name="enabled"
          checked={product.enabled}
          onChange={handleProductChange}
        />
  
        <Form.Check
          inline
          label="Habilitado"
          type="checkbox"
          name={`group${item.id}`}
          id={`menuItem${item.id}`}
          checked={selectedIds.includes(item.id)}
          onChange={() =>
            handleCheckboxChange(
              item.id,
              null,
              item.subItems.length > 0
            )
          }
        /> */}

        <Button variant="gd" onClick={handleSubmit}>
          {product ? "Actualizar Producto" : "Guardar Producto"}
        </Button>
      </Form>
    </TitleSection>
  
    {/* Variantes del producto */}
    <TitleSection id="variantsSection" text="Variantes del Producto">
      <Form>
        <Row>
          <Col sm={6}>
            <Input
              label="Color"
              placeholder="Color de la variante"
              name="color"
              value={variant.color}
              onChange={handleVariantChange}
            />
          </Col>
          <Col sm={6}>
            <Input
              label="Talla"
              placeholder="Talla o tamaño"
              name="size"
              value={variant.size}
              onChange={handleVariantChange}
            />
          </Col>
        </Row>
  
        <Row>
          <Col sm={6}>
            <Input
              label="Costo Unitario"
              type="number"
              name="costUnit"
              value={variant.costUnit}
              onChange={handleVariantChange}
            />
          </Col>
          <Col sm={6}>
            <Input
              label="Precio Unitario"
              type="number"
              name="unitPrice"
              value={variant.unitPrice}
              onChange={handleVariantChange}
              required
            />
          </Col>
        </Row>
  
        {/* <Checkbox
          label="Habilitada"
          name="enabled"
          checked={variant.enabled}
          onChange={handleVariantChange}
        /> */}
  
        <Button variant="secondary" onClick={addVariant}>
          Agregar Variante
        </Button>
      </Form>
  
      {variants.length > 0 && (
        <ContentCard>
          <h5>Variantes agregadas</h5>
          <ul className="list-group">
            {variants.map((v, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                <span>
                  {v.color || "Sin color"} - {v.size || "Sin talla"} (${v.unitPrice})
                </span>
                <Button variant="link" onClick={() => removeVariant(i)}>
                  <i className="bi bi-trash" /> Eliminar
                </Button>
              </li>
            ))}
          </ul>
        </ContentCard>
      )}
    </TitleSection>
  </>
  
  );
};

export default ProductForm;
