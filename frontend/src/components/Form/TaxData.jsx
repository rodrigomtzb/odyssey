import { useState } from "react";

const TaxData = () => {
  const [rfc, setRfc] = useState();


    
    return (
    <>
      <TitleSection text="Datos Generales" isFirst />
      <Input
        label="Nombre Comercial"
        name="name"
        placeholder="Smart Innovation"
      />
      <Input label="Razón Social" name="name" placeholder="Razón Social" />
      <Row>
        <Col sm={12} md={7}>
          <Input label="RFC" name="rfc" placeholder="X1X1X1X1X1X1X1X1" />
        </Col>
        <Col sm={12} md={5} className="d-flex align-items-end">
          <div key="rfcType" className="pb-4">
            <Form.Check
              inline
              label="Persona Física"
              name="rfcType"
              type="radio"
              id="naturalPerson"
              value={rfc}
            />
            <Form.Check
              inline
              label="Persona Moral"
              name="rfcType"
              type="radio"
              id="legalPerson"
              value={rfc}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
