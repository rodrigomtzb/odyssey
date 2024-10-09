import { Button, Card, Form, Stack } from "react-bootstrap";
import { MainCard } from "../../../components";
import {
  AddressSection,
  Input,
  Select,
  TitleSection,
} from "../../../components/Form";

const WorkForm = () => {
  return (
    <MainCard>
      <Card>
        <Form>
          <TitleSection text="Alta de Obra" isFirst withReturnButton />
          <Input label="Nombre de Obra" />
          <Select label="Encargado de Obra" />
          <Select label="Cliente" />
          <AddressSection />
          <Stack direction="horizontal">

          <Button variant="gd" className="ms-auto" type="submit" >Guardar</Button>
          </Stack>
        </Form>
      </Card>
    </MainCard>
  );
};

export default WorkForm;
