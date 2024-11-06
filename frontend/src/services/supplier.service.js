import { destroy, get, post, put } from "../utils/requests";

const createSupplier = (data) => {
  return post("suppliers", data);
};
const addAddress = (id, data) => {
  return post(`suppliers/${id}/address`, data);
};
const addContact = (id, data) => {
  return post(`suppliers/${id}/contact`, data);
};
const addTags = (id, data) => {
  return post(`suppliers/${id}/tag-description`, data);
};
const toggleSupplierStatus = (id) => {
  return post(`suppliers/${id}/enabled`);
};

const getSuppliers = () => {
  return get("suppliers");
};
const getSupplier = (id) => {
  return get(`suppliers/${id}`);
};

const editSupplierData = (id, data) => {
  return put(`suppliers/${id}/data`, data);
};
const editSupplierAddress = (id, data) => {
  return put(`suppliers/${id}/address`, data);
};
const editSupplierContact = (id, data) => {
  return put(`suppliers/${id}/contact`, data);
};

const deleteSupplierAddress = (supplierId, addressId) => {
  return destroy(`suppliers/${supplierId}/address/${addressId}`);
};
const deleteSupplierContact = (supplierId, contactId) => {
  return destroy(`suppliers/${supplierId}/address/${contactId}`);
};

const SupplierService = {
  createSupplier,
  addAddress,
  addContact,
  addTags,
  toggleSupplierStatus,
  getSuppliers,
  getSupplier,
  editSupplierData,
  editSupplierAddress,
  editSupplierContact,
  deleteSupplierAddress,
  deleteSupplierContact,
};

export default SupplierService;
