import { useEffect, useState } from "react";
import { Title } from "../../../components";
import ProductService from "../../../services/product.service";
import FilterDropdown from "../../../components/Buttons/FilterDropdown";
import TableBase from "../../../components/TableBase";
import { TableCell, TableRow } from "@mui/material";
import SearchInput from "../../../components/SearchInput"

const ProductList = () => {
  const [productsVariants, setProductsVariants] = useState([]);
  const [originalProductsVariants, setOriginalProductsVariants] = useState([]);
  const [filter, setFilter] = useState("enabled");

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };


  const handleSearch = (results, searchTerm) => {
    console.log("result");
    console.log(results);

    if (searchTerm === "") {
      // Si el término de búsqueda está vacío, restaura los datos originales
      setProductsVariants(originalProductsVariants);
    } else {
      setProductsVariants(results);
    }
  };

   useEffect(() => {
     const apiCall =
       filter === "enabled"
         ? ProductService.getAllProductsVariants()
         : filter === "disabled"
         ? ProductService.getAllProductsVariants()
         : ProductService.getAllProductsVariants();

     apiCall.then((response) => {
      setOriginalProductsVariants(response.data);
      setProductsVariants(response.data);
     });
   }, [filter]);

  return (
    <>
     <Title title="Productos" withReturnButton />
      <FilterDropdown onFilterChange={handleFilterChange} />
      <SearchInput
        data={originalProductsVariants} // Usamos los datos originales para la búsqueda
        onSearch={(results, searchTerm) => handleSearch(results, searchTerm)}
        searchFields={[
          "categoryName",
          "productName",
          "materialName",
          "size",
          "color",
        ]}
      />

      <TableBase
        dataKey={["variantId", "categoryName", "productName", "variantName"]}
        titles={["ID", "Categoria", "Producto", "Variante"]}
      >
        {productsVariants.map((variant, index) => (
          <TableRow
            key={variant.id}
            sx={{
              backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
              "&:hover": { backgroundColor: "#e0f7fa" },
              borderBottom: "2px solid #ddd",
            }}
          >
            <TableCell>{variant.id}</TableCell>
            <TableCell>{variant.categoryName}</TableCell>
            <TableCell>{variant.productName}</TableCell>
            <TableCell>
                <div>{variant.materialName==null?'':variant.materialName}</div>
                <div>{variant.color==null?'':variant.color}</div>
                <div>{variant.size==null?'':variant.size}</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBase>
    </>
  );
};

export default ProductList;
