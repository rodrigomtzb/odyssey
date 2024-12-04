import { Link, useParams } from "react-router-dom";
import { Title, DefinitionList, ContentCard } from "../../../components";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import { Button, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [userData, setUserData] = useState([]);

  const toggleUserStatus = async () => {
    let countdown = 5;
    let title = formData.enabled ? "Deshabilitar" : "Habilitar";
    let text = formData.enabled ? "deshabilitará" : "habilitará";
    let confirm = formData.enabled ? "deshabilitado" : "habilitado";

    Swal.fire({
      title: `¿${title} usuario?`,
      text: `Esta acción ${text} el usuario.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Confirmar (${countdown})`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        confirmButton.disabled = true;

        const timerInterval = setInterval(() => {
          countdown -= 1;
          confirmButton.textContent = `Confirmar (${countdown})`;

          if (countdown === 0) {
            clearInterval(timerInterval);
            confirmButton.disabled = false;
            confirmButton.textContent = "Confirmar";
          }
        }, 1000);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        UserService.toggleUserStatus(id, {
          id: id,
          enabled: !formData.enabled,
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: `Usuario ${confirm}`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  };

  useEffect(() => {
    UserService.getUser(id).then((response) => {
      setUser(response.data);
    });
  }, []);
  useEffect(() => {
    if (user.id) {
      setUserData([
        {
          title: "ID",
          description: user.id,
        },
        {
          title: "Nombre(s)",
          description: `${user.firstName} ${user.middleName}`,
        },
        {
          title: "Apellidos",
          description: `${user.fatherLastName} ${user.motherLastName}`,
        },
        { title: "Puesto", description: user.jobPosition.name },
        {
          title: "Correo Electrónico",
          description: user.email,
        },
        {
          title: "Contraseña",
          description: "***********",
        },
        // {
        //   title: "Telefono",
        //   description: user.telephone,
        // },
        // {
        //   title: "Fecha de nacimiento",
        //   description: user.birthDate,
        // },
        {
          title: "Roles",
          description: user.role,
        },
      ]);
    }
  }, [user]);

  return (
    <>
      <Title title="Datos de Usuario" withReturnButton />
      <ContentCard>
        <DefinitionList definitions={userData} />
      </ContentCard>
      <div
        className={`mb-4 px-4 py-3 ${
          user.enabled ? "bg-danger-subtle" : "bg-success-subtle"
        }`}
      >
        <Row className="align-items-center">
          <Col>
            <p className="m-0">
              {user.enabled ? "Usuario Activo" : "Usuario Inactivo"}
            </p>
          </Col>
          <Col className="justify-content-end">
            <Button
              variant={user.enabled ? "danger" : "success"}
              onClick={toggleUserStatus}
            >
              {user.enabled ? "Deshabilitar usuario" : "Habilitar usuario"}
            </Button>
          </Col>
        </Row>
      </div>
      <Row>
        <Col>
          <Link to="edit">
            <Button variant="gd">Editar Información</Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default UserDetails;
