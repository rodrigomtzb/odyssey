import { useEffect, useState } from "react";
import { Title } from "../../../components";
import CustomerService from "../../../services/customer.service";
import TaxList from "../../../components/TaxList";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    CustomerService.getCustomers().then((response) => {
      setCustomers(response.data);
    });
  }, []);

  return (
    <>
      <Title title="Lista de Proveedores" withReturnButton />
      <TaxList elements={customers} type="customer" />
    </>
  );
};

export default CustomerList;
