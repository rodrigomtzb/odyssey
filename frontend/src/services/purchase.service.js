import { post } from "../utils/requests";

const createPurchase = (data) => {
  return post("purchase", data);
};

const PurchaseService = {
  createPurchase,
};

export default PurchaseService;
