import $ from "jquery";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import { useEffect, useState } from "react";
import { Title } from "../../../components";
import SupplierService from "../../../services/supplier.service";
import { Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

DataTable.use(DT);

const SupplierList = () => {
  const navigate = useNavigate();
  const [legalSuppliers, setLegalSuppliers] = useState([]);
  const [naturalSuppliers, setNaturalSuppliers] = useState([]);

  const handleView = (id) => {
    navigate(`/providers/${id}`);
  };

  useEffect(() => {
    SupplierService.getSuppliers().then((response) => {
      const allSuppliers = response.data;

      const legal = allSuppliers.filter(
        (supplier) => supplier.personType === "M"
      );
      const natural = allSuppliers.filter(
        (supplier) => supplier.personType === "F"
      );

      setLegalSuppliers(legal);
      setNaturalSuppliers(natural);
    });
  }, []);
  useEffect(() => {
    if (legalSuppliers.length > 0) {
      const table = $("#legalSuppliersTable").DataTable();

      return () => {
        if ($.fn.dataTable.isDataTable("#legalSuppliersTable")) {
          table.destroy();
        }
      };
    }
  }, [legalSuppliers]);
  useEffect(() => {
    if (naturalSuppliers.length > 0) {
      const table = $("#naturalSuppliersTable").DataTable();

      return () => {
        if ($.fn.dataTable.isDataTable("#naturalSuppliersTable")) {
          table.destroy();
        }
      };
    }
  }, [naturalSuppliers]);

  return (
    <>
      <Title title="Lista de Proveedores" />
      <div className="table-responsive">
        <h4>Personas Morales</h4>
        <table id="legalSuppliersTable" className="display table">
          <thead>
            <tr>
              <th>Razon Social</th>
              <th>Nombre Comercial</th>
              <th>RFC</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {legalSuppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>
                  <Link
                    onClick={() => handleView(supplier.id)}
                    className="text-decoration-none text-body"
                  >
                    <p className="fw-bold mb-1">{supplier.legalName}</p>
                  </Link>
                </td>
                <td>{supplier.businessName}</td>
                <td>{supplier.mxRfcCompany}</td>
                <td>
                  {supplier.enabled ? (
                    <Badge bg="success">Activo</Badge>
                  ) : (
                    <Badge bg="danger">Inactivo</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr className="my-5" />
      <div className="table-responsive">
        <h4>Personas Fisicas</h4>
        <table id="naturalSuppliersTable" className="display table">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>RFC</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {naturalSuppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>
                  <Link
                    onClick={() => handleView(supplier.id)}
                    className="text-decoration-none text-body"
                  >
                    <p className="fw-bold mb-1">{supplier.fullName}</p>
                  </Link>
                </td>
                <td>{supplier.mxRfc}</td>
                <td>
                  {supplier.enabled ? (
                    <Badge bg="success">Activo</Badge>
                  ) : (
                    <Badge bg="danger">Inactivo</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default SupplierList;
