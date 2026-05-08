import { destroy, get, post, put } from "../utils/requests";

const getAllProductsVariants = () => {
  return get("/stock/productvariants");
};

const getAllCategoriesProducts = () => {
  return get("/stock/productcategory");
};

const getAllProductsByCategoryId = (categoryId) => {
  return get("/stock/productcategory/"+categoryId+"/products");
};

const getProductById = (categoryId,productId) => {
  return get("/stock/productcategory/"+categoryId+"/products/"+productId);
};

const ProductService = {
    getAllProductsVariants,
    getAllCategoriesProducts,
    getAllProductsByCategoryId,
    getProductById
  };
  
  export default ProductService;