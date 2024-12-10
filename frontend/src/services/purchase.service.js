import { get, post } from "../utils/requests";

const createPurchase = (data) => {
  return post("purchase", data);
};

const getPurchases = () => {
  return get("purchase");
};
const getPurchase = (id) => {
  return get(`purchase/${id}`);
};

const PurchaseService = {
  createPurchase,

  getPurchase,
  getPurchases,
};

export default PurchaseService;
