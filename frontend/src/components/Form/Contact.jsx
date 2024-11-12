import { useEffect, useState } from "react";
import CatalogsService from "../../services/catalogs.service";
import Select from "./Select";
import { handleFormChange, scrollToTop } from "../../utils";
import TitleSection from "./TitleSection";
import { Button, Col, Form, Row } from "react-bootstrap";
import Input from "./Input";
import SupplierService from "../../services/supplier.service";
import CustomerService from "../../services/customer.service";
import Swal from "sweetalert2";

const ContactSection = ({ id, formData, setFormData, to, state }) => {
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
            SupplierService.editSupplierContact(id, contact).then(
              (response) => {
                scrollToTop();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Contacto editado correctamente",
                  showConfirmButton: false,
                  timer: 1500,
                });
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
          case "customer":
            CustomerService.editCustomerContact(id, contact).then(
              (response) => {
                scrollToTop();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Contacto editado correctamente",
                  showConfirmButton: false,
                  timer: 1500,
                });
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
            SupplierService.addContact(id, contact).then((response) => {
              scrollToTop();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Contacto agregado correctamenre",
                showConfirmButton: false,
                timer: 1500,
              });
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
          case "customer":
            CustomerService.addContact(id, contact).then((response) => {
              scrollToTop();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Contacto agregado correctamente",
                showConfirmButton: false,
                timer: 1500,
              });
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
    setIsOpen(state);
  }, [state]);

  useEffect(() => {
    if (formData) {
      setIsOpen(true);
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
    <div id="contactSection">
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
    </div>
  );
};

export default ContactSection;
