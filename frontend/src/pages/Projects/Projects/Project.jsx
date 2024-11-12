import { useEffect, useState } from "react";
import { ContentCard, DefinitionList, Title } from "../../../components";
import { Link, useParams } from "react-router-dom";
import ProjectService from "../../../services/project.service";
import { Button, Col, Row } from "react-bootstrap";
import AddressService from "../../../services/address.service";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState();
  const [projectDataList, setProjectDataList] = useState();
  const [projectAddresses, setProjectAddresses] = useState([]);

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
          description: `${project.user.firstName} ${
            project.user.middleName || ""
          } ${project.user.fatherLastName || ""} ${
            project.user.motherLastName || ""
          }`.trim(),
        },
        {
          title: "Encargado",
          description: `${customerName} ${
            businessName ? `- ${businessName}` : ""
          }`,
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

  useEffect(() => {
    if (id) {
      ProjectService.getProject(id).then((response) => {
        setProject(response.data);
        console.log(response.data);
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
      <Title title="Datos de Proyecto" withReturnButton />
      <ContentCard>
        {projectDataList && <DefinitionList definitions={projectDataList} />}
        {projectAddresses.length > 0 &&
          projectAddresses.map((list, index) => (
            <div key={index}>
              <hr />
              <h5>Dirección {index + 1}</h5>
              <DefinitionList definitions={list} index={index} />
            </div>
          ))}
      </ContentCard>
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
export default ProjectDetails;
