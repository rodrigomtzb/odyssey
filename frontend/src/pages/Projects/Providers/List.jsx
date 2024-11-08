import { useEffect, useState } from "react";
import { Title } from "../../../components";
import SupplierService from "../../../services/supplier.service";
import TaxList from "../../../components/TaxList";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    SupplierService.getSuppliers().then((response) => {
      setSuppliers(response.data);
    });
  }, []);

  return (
    <>
      <Title title="Lista de Proveedores" withReturnButton />
      <TaxList elements={suppliers} type="supplier" />
    </>
  );
};
export default SupplierList;
