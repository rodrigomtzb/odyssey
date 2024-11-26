import { destroy, get, post, put } from "../utils/requests";

const createCustomer = (data) => {
  return post("customers", data);
};
const addAddress = (id, data) => {
  return post(`customers/${id}/address`, data);
};
const addContact = (id, data) => {
  return post(`customers/${id}/contact`, data);
};
const toggleCustomerStatus = (id, data) => {
  return post(`customers/${id}/enabled`, data);
};

const getAllCustomers = () => {
  return get("customers");
};
const getEnabledCustomers = () => {
  return get("customers?isEnabled=true");
};
const getDisabledCustomers = () => {
  return get("customers?isEnabled=false");
};
const getCustomersBySearch = (word) => {
  return get(`customers/searchby?searchby=${word}`);
};
const getCustomer = (id) => {
  return get(`customers/${id}`);
};

const editCustomerData = (id, data) => {
  return put(`customers/${id}/data`, data);
};
const editCustomerAddress = (id, data) => {
  return put(`customers/${id}/address`, data);
};
const editCustomerContact = (id, data) => {
  return put(`customers/${id}/contact`, data);
};

const deleteCustomerAddress = (customerId, addressId) => {
  return destroy(`customers/${customerId}/address/${addressId}`);
};
const deleteCustomerContact = (customerId, contactId) => {
  return destroy(`customers/${customerId}/contact/${contactId}`);
};

const CustomerService = {
  createCustomer,
  addAddress,
  addContact,
  toggleCustomerStatus,
  getAllCustomers,
  getEnabledCustomers,
  getDisabledCustomers,
  getCustomersBySearch,
  getCustomer,
  editCustomerData,
  editCustomerAddress,
  editCustomerContact,
  deleteCustomerAddress,
  deleteCustomerContact,
};

export default CustomerService;
