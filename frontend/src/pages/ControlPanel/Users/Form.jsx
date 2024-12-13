import { Form, Button, Stack, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { Input, Select, TitleSection } from "../../../components/Form";
import {
  handleEmailChange,
  handleFormChange,
  scrollToSection,
  scrollToTop,
} from "../../../utils";

import AuthService from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { ContentCard, DefinitionList, Title } from "../../../components";
import UserService from "../../../services/user.service";
import JobPositionService from "../../../services/job-position.service";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const status = [
    { id: true, name: "ACTIVO" },
    { id: false, name: "INACTIVO" },
  ];
  const [validated, setValidated] = useState(false);
  const [jobPositions, setJobPositions] = useState();
  const [parentUsers, setParentUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    fatherLastName: "",
    motherLastName: "",
    jobPositionId: "",
    email: "",
    username: "",
    password: "",
    parentUserId: "",
  });
  const [userData, setUserData] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userJob, setUserJob] = useState();
  const [dataVisible, setDataVisible] = useState(false);
  const [dataIsOpen, setDataIsOpen] = useState(true);

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
            navigate("/users/list");
          });
        });
      }
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      scrollToTop();
      e.stopPropagation();
    } else {
      Swal.fire({
        title: "¿Estás seguro de la información del usuario?",
        text: "Podrás cambiarlo después",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            if (id) {
              UserService.editUserData(id, {
                id: id,
                firstName: formData.firstName,
                middleName: formData.middleName,
                fatherLastName: formData.fatherLastName,
                motherLastName: formData.motherLastName,
              })
                .then(() => {
                  UserService.editUserJob(id, {
                    userId: id,
                    jobPositionId: formData.jobPositionId,
                  }).then(() => {
                    UserService.editUserEmail(id, {
                      id: id,
                      email: formData.email,
                    })
                      .then(() => {
                        if (formData.password) {
                          UserService.editUserPassword(id, {
                            id: id,
                            password: formData.password,
                          }).catch((error) => {
                            console.error(
                              "Error al editar contraseña: ",
                              error
                            );
                          });
                        }
                        Swal.fire({
                          icon: "success",
                          title: "Usuario actualizado",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        setDataIsOpen(false);
                        console.log(response.data);
                        setUserData(getUserData(response.data));
                        setFormData(response.data);
                        setDataVisible(true);
                        scrollToTop();
                      })
                      .catch((error) => {
                        console.error("Error al editar email: ", error);
                      });
                  });
                })
                .catch((error) =>
                  console.error("Error al editar datos generales: ", error)
                );
            } else {
              AuthService.register(formData).then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    icon: "success",
                    title: "Usuario registrado",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  setDataIsOpen(false);
                  console.log(response.data);
                  setUserData(getUserData(response.data));
                  setFormData(response.data);
                  setDataVisible(true);
                  scrollToTop();
                }
              });
            }
          } catch (error) {
            console.error("Hubo un error al enviar el formulario:", error);
            alert("Error al crear el usuario");
          }
        }
      });
    }
  };
  const getUserData = (user) => {
    return [
      { title: "ID", description: user.id },
      {
        title: "Primer Nombre",
        description: user.firstName,
      },
      {
        title: "Segundo Nombre",
        description: user.middleName,
      },
      {
        title: "Apellido Paterno",
        description: user.fatherLastName,
      },
      {
        title: "Apellido Materno",
        description: user.motherLastName,
      },
    ];
  };
  const getUserJob = (user) => {
    return [{ title: "Puesto", description: user.jobPosition.name }];
  };
  const getUserEmail = (user) => {
    return [{ title: "Correo Electrónico", description: user.email }];
  };
  const handleEdit = () => {
    setDataIsOpen(true);
    scrollToSection("dataSection");
  };

  useEffect(() => {
    if (formData.jobPositionId) {
      let selectedJob = jobPositions.find(
        (job) => job.id === formData.jobPositionId
      );
      UserService.getUsers().then((response) => {
        let filteredUsers = response.data.filter(
          (user) => user.jobPosition.id === selectedJob.parent_id
        );
        setParentUsers(filteredUsers);
      });
    } else {
      setParentUsers([]);
    }
  }, [formData.jobPositionId]);
  useEffect(() => {
    if (id) {
      setDataVisible(true);
      setDataIsOpen(false);
      UserService.getUser(id).then((response) => {
        setFormData({
          ...response.data,
          password: "",
          jobPositionId: response.data.jobPosition.id,
        });
        setUserData(getUserData(response.data));
        setUserEmail(getUserEmail(response.data));
        setUserJob(getUserJob(response.data));
      });
    }
  }, [id]);
  useEffect(() => {
    JobPositionService.getEnabledJobPositions().then((response) => {
      console.log(response.data);
      setJobPositions(response.data);
    });
  }, []);

  return (
    <>
      <Title
        title={id ? "Información de Usuario" : "Información de Registro"}
        withReturnButton
      />
      {userData && dataVisible ? (
        <ContentCard>
          {userData && (
            <Row>
              <Col sm={10}>
                <DefinitionList definitions={userData} />
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
          )}
          {userJob && (
            <>
              <hr />
              <Row>
                <Col sm={10}>
                  <DefinitionList definitions={userJob} />
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
            </>
          )}
          {userEmail && (
            <>
              <hr />
              <Row>
                <Col sm={10}>
                  <DefinitionList definitions={userEmail} />
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
            </>
          )}
          {userEmail && (
            <>
              <hr />
              <Row>
                <Col sm={10}>
                  <DefinitionList
                    definitions={[
                      { title: "Contraseña", description: "***********" },
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
            </>
          )}
        </ContentCard>
      ) : (
        ""
      )}
      <div id="dataSection">
        <TitleSection text="Datos Generales" isFirst state={dataIsOpen}>
          <Form onSubmit={handleSubmit} noValidate validated={validated}>
            {/* <Form.Group className="mb-3" controlId="names"> */}
            <Row>
              <Col>
                <Input
                  label="Primer nombre"
                  name="firstName"
                  placeholder="Ingresa los nombres"
                  value={formData.firstName}
                  onChange={handleFormChange(formData, setFormData)}
                  max={100}
                  regexType="letters-and-space"
                  required
                />
              </Col>
              <Col>
                <Input
                  label="Segundo nombre"
                  name="middleName"
                  placeholder="Ingresa los nombres"
                  value={formData.middleName}
                  onChange={handleFormChange(formData, setFormData)}
                  max={100}
                  regexType="letters-and-space"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  label="Apellido Paterno"
                  name="fatherLastName"
                  placeholder="Ingresa el apellido paterno"
                  value={formData.fatherLastName}
                  onChange={handleFormChange(formData, setFormData)}
                  max={100}
                  regexType="letters-and-space"
                  required
                />
              </Col>
              <Col>
                <Input
                  label="Apellido Materno"
                  name="motherLastName"
                  placeholder="Ingresa el apellido materno"
                  value={formData.motherLastName}
                  onChange={handleFormChange(formData, setFormData)}
                  max={100}
                  regexType="letters-and-space"
                  required
                />
              </Col>
            </Row>
            <hr />
            <Select
              label="Puesto"
              name="jobPositionId"
              value={formData.jobPositionId}
              onChange={handleFormChange(formData, setFormData)}
              options={jobPositions}
              required
            />
            <Select
              label="Jefe Inmediato"
              name="parentUserId"
              value={formData.parentUserId}
              onChange={handleFormChange(formData, setFormData)}
              options={parentUsers.map((user) => ({
                id: user.id,
                name: `${user.firstName || ""} ${user.middleName || ""} ${
                  user.fatherLastName || ""
                } ${user.motherLastName || ""}`,
              }))}
              required
            />
            <hr />
            <Input
              label="Correo Electrónico"
              type="email"
              name="email"
              placeholder="ejemplo@gmail.com"
              value={formData.email}
              onChange={handleEmailChange(formData, setFormData)}
              max={100}
              required
            />
            <Input
              label="Contraseña"
              type="password"
              name="password"
              placeholder={
                id
                  ? "Para mantener la contraseña, deje en blanco"
                  : "Ingresa tu contraseña"
              }
              value={formData.password}
              onChange={handleFormChange(formData, setFormData)}
              max={50}
            />
            <Stack direction="horizontal" gap={2}>
              <Button variant="gd" className="ms-auto" type="submit">
                {id ? "Actualizar" : "Registrar"}
              </Button>
            </Stack>
          </Form>
        </TitleSection>
      </div>
      {id ? (
        <>
          <hr />
          <div
            className={`mt-2 px-4 py-3 ${
              formData.enabled ? "bg-danger-subtle" : "bg-success-subtle"
            }`}
          >
            <Row className="align-items-center">
              <Col>
                <p className="m-0">
                  {formData.enabled ? "Usuario Activo" : "Usuario Inactivo"}
                </p>
              </Col>
              <Col className="justify-content-end">
                <Button
                  variant={formData.enabled ? "danger" : "success"}
                  onClick={toggleUserStatus}
                >
                  {formData.enabled
                    ? "Deshabilitar usuario"
                    : "Habilitar usuario"}
                </Button>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default UserForm;
