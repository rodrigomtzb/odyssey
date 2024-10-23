import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardSessions = () => {
  return (
    <>
      <Title title="Sesiones" />
      <CardButton
        icon="ui-checks"
        section="Sesiones"
        text="Lista de Sesiones"
        to="list"
      />
    </>
  );
};

export default DashboardSessions;
