import { useState } from "react";
import { Title } from "../../../components";
import { Input, TitleSection } from "../../../components/Form";
import { handleFormChange } from "../../../utils";
import { Button } from "react-bootstrap";
import EmailService from "../../../services/email.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SendMail = () => {
  const navigate = useNavigate();
  const [emailTo, setEmailTo] = useState({
    email: "",
    name: "",
  });
  const handleSubmitEmail = () => {
    if (emailTo.email && emailTo.name) {
      EmailService.sendMailDefault({ to: emailTo })
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Email enviado correctamente",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => navigate("/notifications"));
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <>
      <Title title="Enviar Email" />
      <TitleSection text="Datos del Remitente" isFirst>
        <Input
          label="Correo Electrónico"
          name="email"
          type="email"
          placeholder="ejemplo@ejemplo.com"
          value={emailTo.email}
          onChange={handleFormChange(emailTo, setEmailTo)}
        />
        <Input
          label="Nombre Completo"
          name="name"
          placeholder="Rafael Medina"
          value={emailTo.name}
          onChange={handleFormChange(emailTo, setEmailTo)}
        />
        <Button onClick={handleSubmitEmail} variant="gd">
          Enviar
        </Button>
      </TitleSection>
    </>
  );
};
export default SendMail;
