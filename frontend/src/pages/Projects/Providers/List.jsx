import { useEffect, useState } from "react";
import { Title } from "../../../components";
import SupplierService from "../../../services/supplier.service";
import TaxList from "../../../components/TaxList";
import FilterDropdown from "../../../components/Buttons/FilterDropdown";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filter, setFilter] = useState("enabled");

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    const apiCall =
      filter === "enabled"
        ? SupplierService.getEnabledSuppliers()
        : filter === "disabled"
        ? SupplierService.getDisabledSuppliers()
        : SupplierService.getAllSuppliers();

    apiCall.then((response) => {
      setSuppliers(response.data);
    });
  }, [filter]);

  return (
    <>
      <Title title="Lista de Proveedores" withReturnButton />
      <FilterDropdown onFilterChange={handleFilterChange} />
      <TaxList key="supplierTable" elements={suppliers} type="supplier" />
    </>
  );
};
export default SupplierList;
