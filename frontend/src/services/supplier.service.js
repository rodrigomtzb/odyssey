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
const toggleSupplierStatus = (id, data) => {
  return post(`suppliers/${id}/enabled`, data);
};

const getAllSuppliers = () => {
  return get("suppliers");
};
const getEnabledSuppliers = () => {
  return get("suppliers?isEnabled=true");
};
const getDisabledSuppliers = () => {
  return get("suppliers?isEnabled=false");
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
  getAllSuppliers,
  getEnabledSuppliers,
  getDisabledSuppliers,
  getSupplier,
  editSupplierData,
  editSupplierAddress,
  editSupplierContact,
  deleteSupplierAddress,
  deleteSupplierContact,
};

export default SupplierService;
