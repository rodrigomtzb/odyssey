import { useEffect, useState } from "react";
import { Title } from "../../../components";
import CompanyService from "../../../services/company.service"
import TaxList from "../../../components/TaxList";
import FilterDropdown from "../../../components/Buttons/FilterDropdown";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [filter, setFilter] = useState("enabled");

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    const apiCall =
      filter === "enabled"
        ? CompanyService.getEnabledCompanies()
        : filter === "disabled"
        ? CompanyService.getDisabledCompanies()
        : CompanyService.getAllCompanies();

    apiCall.then((response) => {
        setCompanies(response.data);
    });
  }, [filter]);

  return (
    <>
      <Title title="Lista de Compañias" withReturnButton />
      <FilterDropdown onFilterChange={handleFilterChange} />
      <TaxList key="companyTable" elements={companies} type="company" />
    </>
  );
};

export default CompanyList;
