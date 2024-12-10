import { get } from "../utils/requests";

const getBanks = () => {
  return get("banks");
};
const getBankByFirstNumbers = (firstNumbers) => {
  return get(`banks?firstNumbers=${firstNumbers}`);
};

const BankService = {
  getBanks,
  getBankByFirstNumbers,
};

export default BankService;
