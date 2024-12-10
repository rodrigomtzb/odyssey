import { get } from "../utils/requests";

const getMaterials = () => {
  return get("material");
};
const getMaterialBySearch = (search) => {
  return get(`materal?searchby=${search}`);
};

const MaterialService = {
  getMaterialBySearch,
  getMaterials,
};

export default MaterialService;
