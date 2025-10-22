import { useEffect, useState } from "react";
import { Title } from "../../../components";
import SucursalService from "../../../services/sucursal.service"
import TaxList from "../../../components/TaxList";
import FilterDropdown from "../../../components/Buttons/FilterDropdown";

const SucursalList = () => {
  const [sucursales, setSucursales] = useState([]);
  const [filter, setFilter] = useState("enabled");

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    const apiCall =
      filter === "enabled"
        ? SucursalService.getEnabledSucursales()
        : filter === "disabled"
        ? SucursalService.getDisabledSucursales()
        : SucursalService.getAllSucursales();

    apiCall.then((response) => {
        setSucursales(response.data);
    });
  }, [filter]);

  return (
    <>
      <Title title="Lista de Compañias" withReturnButton />
      <FilterDropdown onFilterChange={handleFilterChange} />
      <TaxList key="sucursalTable" elements={sucursales} type="sucursal" />
    </>
  );
};

export default SucursalList;
