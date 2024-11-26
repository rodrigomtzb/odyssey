import { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const FilterDropdown = ({ onFilterChange }) => {
  const [filter, setFilter] = useState("enabled"); 


  useEffect(() => {
    if (filter) {
      onFilterChange(filter);
    }
  }, [filter]);

  return (
    <div className="d-flex align-items-center mb-3">
      <DropdownButton
        id="userFilterDropdown"
        title={
          <>
            <i className="bi bi-funnel-fill me-2" />
            {filter === "enabled"
              ? "Habilitados"
              : filter === "disabled"
              ? "Deshabilitados"
              : "Todos"}
          </>
        }
        onSelect={(eventKey) => setFilter(eventKey)}
        variant={
          filter === "enabled"
            ? "success"
            : filter === "disabled"
            ? "danger"
            : "primary"
        }
      >
        <Dropdown.Item eventKey="enabled">Habilitados</Dropdown.Item>
        <Dropdown.Item eventKey="disabled">Deshabilitados</Dropdown.Item>
        <Dropdown.Item eventKey="all">Todos</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default FilterDropdown;
