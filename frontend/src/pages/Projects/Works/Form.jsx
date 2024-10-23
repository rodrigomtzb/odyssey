import { Button, Form, Stack } from "react-bootstrap";
import { Title } from "../../../components";
import {
  AddressSection,
  Input,
  Select,
  TitleSection,
} from "../../../components/Form";

const WorkForm = () => {
  return (
    <>
      <Title title="Alta de Proyecto" withReturnButton />
      <Form>
        <TitleSection text="Datos Generales" isFirst />
        <Select label="Encargado de Proyecto" />
        <Select label="Cliente" />
        <Input label="Nombre de Proyecto" placeholder="Edificio Munguia" />
        <AddressSection />
        <Stack direction="horizontal">
          <Button variant="gd" className="ms-auto" type="submit">
            Guardar
          </Button>
        </Stack>
      </Form>
    </>
  );
};

export default WorkForm;
