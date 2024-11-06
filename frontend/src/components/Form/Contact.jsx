import { useEffect, useState } from "react";
import CatalogsService from "../../services/catalogs.service";
import Select from "./Select";
import { handleFormChange } from "../../utils";
import TitleSection from "./TitleSection";
import { Button, Col, Form, Row } from "react-bootstrap";
import Input from "./Input";
import SupplierService from "../../services/supplier.service";

const ContactSection = ({ id, formData, setFormData, to }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [phoneType, setPhoneType] = useState([]);
  const [contact, setContact] = useState({
    personName: "",
    email: "",
    phoneNumber: "",
    phoneTypeId: "",
  });

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    if (formData) {
      try {
        switch (to) {
          case "supplier":
            console.log(contact);
            SupplierService.editSupplierContact(id, contact).then(
              (response) => {
                console.log(response.data);
                setFormData(response.data);
                setContact({
                  personName: "",
                  email: "",
                  phoneNumber: "",
                  phoneTypeId: "",
                });
                setIsOpen(false);
              }
            );
            break;

          default:
            break;
        }
      } catch (error) {}
    } else {
      try {
        switch (to) {
          case "supplier":
            console.log(contact);
            SupplierService.addContact(id, contact).then((response) => {
              console.log(response.data);
              setFormData(response.data);
              setContact({
                personName: "",
                email: "",
                phoneNumber: "",
                phoneTypeId: "",
              });
              setIsOpen(false);
            });
            break;

          default:
            break;
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (formData) {
      setContact({
        ...formData,
        phoneTypeId: formData.phoneType.id,
        contactId: formData.id,
      });
    }
  }, [formData]);

  useEffect(() => {
    CatalogsService.getPhoneType().then((response) =>
      setPhoneType(response.data)
    );
  }, []);

  return (
    <TitleSection text="Contacto" state={isOpen}>
      <Form>
        <Input
          label="Nombre de Contacto"
          placeholder="Fernando Fernandez"
          name="personName"
          value={contact.personName}
          onChange={handleFormChange(contact, setContact)}
        />
        <Input
          label="Correo Electrónico"
          placeholder="ejemplo@gmail.com"
          name="email"
          value={contact.email}
          onChange={handleFormChange(contact, setContact)}
        />
        <Row>
          <Col sm={12} lg={6}>
            <Input
              label="Teléfono"
              placeholder="5512345678"
              name="phoneNumber"
              value={contact.phoneNumber}
              onChange={handleFormChange(contact, setContact)}
            />
          </Col>
          <Col sm={12} lg={6}>
            <Select
              label="Tipo Telefono"
              name="phoneTypeId"
              options={phoneType}
              value={contact.phoneTypeId}
              onChange={handleFormChange(contact, setContact)}
            />
          </Col>
        </Row>
        <Button variant="gd" onClick={handleSubmitContact}>
          {formData ? "Actualizar" : "Añadir"}
        </Button>
      </Form>
    </TitleSection>
  );
};

export default ContactSection;
