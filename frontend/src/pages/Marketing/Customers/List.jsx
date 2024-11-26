import { useEffect, useState } from "react";
import { Title } from "../../../components";
import CustomerService from "../../../services/customer.service";
import TaxList from "../../../components/TaxList";
import FilterDropdown from "../../../components/Buttons/FilterDropdown";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("enabled");

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    const apiCall =
      filter === "enabled"
        ? CustomerService.getEnabledCustomers()
        : filter === "disabled"
        ? CustomerService.getDisabledCustomers()
        : CustomerService.getAllCustomers();

    apiCall.then((response) => {
      setCustomers(response.data);
    });
  }, [filter]);

  return (
    <>
      <Title title="Lista de Clientes" withReturnButton />
      <FilterDropdown onFilterChange={handleFilterChange} />
      <TaxList key="customersTable" elements={customers} type="customer" />
    </>
  );
};

export default CustomerList;
