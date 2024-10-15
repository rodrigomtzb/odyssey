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
          
          <TitleSection text="Alta de Proyecto" isFirst withReturnButton />
          <Select label="Encargado de Proyecto" />
          <Select label="Cliente" />
          <Input label="Nombre de Proyecto" placeholder="Edificio Munguia" />
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
