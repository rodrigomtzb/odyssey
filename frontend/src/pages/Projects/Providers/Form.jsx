import { useParams } from "react-router-dom";
import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import {
  AddressSection,
  Input,
  Select,
  TitleSection,
} from "../../../components/Form";
import { MainCard } from "../../../components";

const ProviderForm = () => {
  const id = useParams();
  const users = [
    { id: 1, name: "Alfredo Alexis Fiesco Venegas" },
    { id: 2, name: "Karina Lizette Vilchis Carbajal" },
  ];
  return (
    <MainCard>
      <Card>
        <TitleSection text="Alta de Proveedor" isFirst withReturnButton />
        <Form>
          <Input
            label="Nombre Completo"
            name="name"
            placeholder="Smart Innovation"
          />
          <Input
            label="RFC"
            name="rfc"
            placeholder="X1X1X1X1X1X1X1X1"
          />
          <AddressSection />
          <Stack direction="horizontal" gap={2}>
            <Button variant="gd" className="ms-auto" type="submit">
              Registrar
            </Button>
          </Stack>
        </Form>
      </Card>
    </MainCard>
  );
};

export default ProviderForm;
