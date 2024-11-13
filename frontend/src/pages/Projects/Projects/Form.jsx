import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { ContentCard, DefinitionList, Title } from "../../../components";
import {
  AddressSection,
  Input,
  Select,
  TitleSection,
} from "../../../components/Form";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import CustomerService from "../../../services/customer.service";
import ProjectService from "../../../services/project.service";
import { handleFormChange, scrollToSection, scrollToTop } from "../../../utils";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import AddressService from "../../../services/address.service";

const ProjectForm = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [project, setProject] = useState();
  const [projectDataList, setProjectDataList] = useState();
  const [projectAddresses, setProjectAddresses] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const [dataVisible, setDataVisible] = useState(true);
  const [projectData, setProjectData] = useState({
    user_id: "",
    customer_id: "",
    name: "",
  });

  const handleSubmitData = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro de la información del proyecto?",
      text: "Podrás cambiarlo después",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        ProjectService.createProject(projectData).then((response) => {
          let project = response.data;
          setDataVisible(false);
          setProjectDataList();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Datos editados correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          ProjectService.getProject(project.id).then((response) => {
            setProject(response.data);
            scrollToTop();
          });
        });
      }
    });
  };
  const handleUpdateData = async (e) => {
    e.preventDefault();
    console.log(projectData);
    Swal.fire({
      title: "¿Estás seguro de la información del proyecto?",
      text: "Podrás cambiarlo después",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        ProjectService.editProjectData(project.id, projectData)
          .then((response) => {
            let project = response.data;
            setDataVisible(false);
            setProject(project);
            console.log(project);
            setProjectDataList();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Datos editados correctamente",
              showConfirmButton: false,
              timer: 1500,
            });
            scrollToTop();
          })
          .catch((error) => console.error(error));
      }
    });
  };
  const handleEdit = (index, type) => {
    switch (type) {
      case "data":
        setDataVisible(true);
        setProjectData({
          id: project.id,
          user_id: project.user.id,
          customer_id: project.customer.id,
          name: project.name,
        });
        scrollToSection("dataSection");
        break;
      case "address":
        setSelectedAddress(project.address[index]);
        scrollToSection("addressSection");
        break;
    }
  };
  const handleDelete = (index, type) => {
    Swal.fire({
      title: "¿Estás seguro en eliminarlo?",
      text: "Se perderan todos los datos ingresados",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        switch (type) {
          case "address":
            let addressId = project.address[index].id;
            ProjectService.deleteProjectAddress(project.id, addressId).then(
              (response) => {
                console.log(response.data);
                setProject(response.data);
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Dirección eliminada correctamente",
                  showConfirmButton: false,
                  timer: 1500,
                });
                scrollToTop();
              }
            );
            break;
          default:
            break;
        }
      }
    });
  };
  const getProjectDataList = (project) => {
    if (project) {
      let customerName;
      let businessName;
      switch (project.customer.personType) {
        case "F":
          customerName = project.customer.fullName;
          break;
        case "M":
          customerName = project.customer.legalName;
          businessName = project.customer.businessName;
          break;
        default:
          break;
      }
      return [
        {
          title: "Nombre del proyecto",
          description: project.name,
        },
        {
          title: "Cliente",
          description: `${customerName} ${
            businessName ? `- ${businessName}` : ""
          }`,
        },
        {
          title: "Encargado",
          description: `${project.user.firstName} ${
            project.user.middleName || ""
          } ${project.user.fatherLastName || ""} ${
            project.user.motherLastName || ""
          }`.trim(),
        },
      ];
    }
  };
  const fetchAddresses = async (addresses) => {
    return await Promise.all(
      addresses.map(async (address) => {
        const neighborhood = await AddressService.getNeighborhood(
          address.statemxId,
          address.townId,
          address.neighborhoodId
        );
        return [
          { title: "Tipo de Domicilio", description: address.addressType.name },
          { title: "Calle", description: address.street },
          { title: "N° Ext.", description: address.number },
          { title: "N° Int.", description: address.apartmentNumber },
          { title: "Colonia", description: neighborhood.data.name },
          { title: "Municipio", description: neighborhood.data.town.name },
          { title: "Estado", description: neighborhood.data.town.state.name },
          { title: "Codigo Postal", description: address.zipCode },
          {
            title: "Primera Calle Referencia",
            description: address.firstStreet,
          },
          {
            title: "Segunda Calle Referencia",
            description: address.secondStreet,
          },
          { title: "Referencia", description: address.description },
        ];
      })
    );
  };
  const toggleProjectStatus = () => {
    let countdown = 5;
    let title = project.enabled ? "Deshabilitar" : "Habilitar";
    let text = project.enabled ? "deshabilitará" : "habilitará";
    let confirm = project.enabled ? "deshabilitado" : "habilitado";

    Swal.fire({
      title: `¿${title} proyecto?`,
      text: `Esta acción ${text} el proyecto.`,
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
        ProjectService.toggleProjectStatus(id, {
          id: id,
          enabled: !project.enabled,
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: `Proyecto ${confirm}`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            ProjectService.getProject(project.id).then((response) => {
              setProject(response.data);
              scrollToTop();
            });
          });
        });
      }
    });
  };

  useEffect(() => {
    UserService.getUsersEnabled().then((response) => {
      setUsers(response.data);
    });
    CustomerService.getCustomers().then((response) => {
      setCustomers(response.data);
    });
  }, []);

  useEffect(() => {
    if (id) {
      setDataVisible(false);
      ProjectService.getProject(id).then((response) => {
        setProject(response.data);
      });
    }
  }, [id]);

  useEffect(() => {
    const getProjectData = async () => {
      try {
        setProjectDataList(getProjectDataList(project));

        if (project.address && project.address.length > 0) {
          const addresses = await fetchAddresses(project.address);
          setProjectAddresses(addresses);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (project) {
      getProjectData();
    }
  }, [project]);
  return (
    <>
      <Title title="Alta de Proyecto" withReturnButton />
      {project && (
        <ContentCard>
          <Row>
            <Col sm={10}>
              {projectDataList && (
                <DefinitionList definitions={projectDataList} />
              )}
            </Col>
            <Col
              sm={2}
              className="d-flex justify-content-center align-items-center"
            >
              <Button variant="gd" onClick={() => handleEdit("", "data")}>
                <i className="bi bi-pencil-square" />
              </Button>
            </Col>
          </Row>
          {projectAddresses &&
            projectAddresses.map((list, index) => (
              <>
                <hr />
                <Row>
                  <Col sm={10}>
                    <div key={index}>
                      <h5>Dirección {index + 1}</h5>
                      <DefinitionList definitions={list} />
                    </div>
                  </Col>
                  <Col
                    sm={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <Row>
                      <Col
                        sm={12}
                        className="mb-1 d-flex justify-content-center"
                      >
                        <Button
                          variant="gd"
                          onClick={() => handleEdit(index, "address")}
                        >
                          <i className="bi bi-pencil-square" />
                        </Button>
                      </Col>

                      <Col
                        sm={12}
                        className="mt-1 d-flex justify-content-center"
                      >
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(index, "address")}
                        >
                          <i className="bi bi-trash-fill" />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            ))}
        </ContentCard>
      )}
      <div id="dataSection" />
      {dataVisible && (
        <TitleSection text="Datos Generales" isFirst>
          <Form>
            <Select
              label="Encargado de Proyecto"
              name="user_id"
              value={projectData.user_id}
              onChange={handleFormChange(projectData, setProjectData)}
            >
              {users
                .filter((user) => user.firstName)
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {`${user.firstName} ${user.middleName || ""} ${
                      user.fatherLastName || ""
                    } ${user.motherLastName || ""}`.trim()}
                  </option>
                ))}
            </Select>
            <Select
              label="Cliente"
              name="customer_id"
              value={projectData.customer_id}
              onChange={handleFormChange(projectData, setProjectData)}
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.fullName}
                </option>
              ))}
            </Select>
            <Input
              label="Nombre de Proyecto"
              placeholder="Edificio Munguia"
              name="name"
              value={projectData.name}
              onChange={handleFormChange(projectData, setProjectData)}
            />
            {project ? (
              <Button variant="gd" onClick={handleUpdateData}>
                Actualizar
              </Button>
            ) : (
              <Button variant="gd" onClick={handleSubmitData}>
                Guardar
              </Button>
            )}
          </Form>
        </TitleSection>
      )}
      {project && (
        <AddressSection
          formData={selectedAddress}
          setFormData={setProject}
          to="project"
          id={project.id}
          state={id ? false : true}
        />
      )}
      {id && project ? (
        <>
          <hr />
          <div
            className={`mt-2 px-4 py-3 ${
              project.enabled ? "bg-danger-subtle" : "bg-success-subtle"
            }`}
          >
            <Row className="align-items-center">
              <Col>
                <p className="m-0">
                  {project.enabled ? "Proyecto Activo" : "Proyecto Inactivo"}
                </p>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button
                  variant={project.enabled ? "danger" : "success"}
                  onClick={toggleProjectStatus}
                >
                  {project.enabled
                    ? "Deshabilitar Proyecto"
                    : "Habilitar Proyecto"}
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

export default ProjectForm;
