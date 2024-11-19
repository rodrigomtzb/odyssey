import { useEffect } from "react";
import { Title } from "../../../components";
import { Select, TitleSection } from "../../../components/Form";
import JobPositionService from "../../../services/job-position.service";

const syncAccessForm = () => {
  useEffect(() => {
    JobPositionService.getJobPositions().then((response) => {
      console.log(response.data);
    });
  }, []);
  return (
    <>
      <Title title="Sincronizar Accesos" withReturnButton />
      <TitleSection>
        <Select />
      </TitleSection>
    </>
  );
};

export default syncAccessForm;
