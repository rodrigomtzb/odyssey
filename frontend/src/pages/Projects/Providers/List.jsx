import { useEffect, useState } from "react";
import { Title } from "../../../components";
import SupplierService from "../../../services/supplier.service";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState();

  useEffect(() => {
    SupplierService.getSuppliers().then((response) => {
      console.log(response.data);
      setSuppliers(response.data);
    });
  }, []);
  return (
    <>
      <Title title="Lista de Proveedores" />
    </>
  );
};
export default SupplierList;
