import { destroy, get, post, put } from "../utils/requests";

const createSucursal = (companyId,data) => {
  return post(`${companyId}/sucursales`, data);
};
const addAddress = (id, data) => {
  return post(`sucursales/${id}/address`, data);
};
const addContact = (id, data) => {
  return post(`sucursales/${id}/contact`, data);
};
const toggleSucursalStatus = (id, data) => {
  return post(`sucursales/${id}/enabled`, data);
};

const getAllSucursales = (companyId) => {
  return get("/companies/"+companyId+"/sucursales");
};
const getEnabledSucursales = () => {
  return get("sucursales?isEnabled=true");
};
const getDisabledSucursales = () => {
  return get("sucursales?isEnabled=false");
};
const getSucursalsBySearch = (word) => {
  return get(`sucursales/searchby?searchby=${word}`);
};
const getSucursal = (id) => {
  return get(`sucursales/${id}`);
};

const editSucursalData = (id, data) => {
  return put(`sucursales/${id}/data`, data);
};
const editSucursalAddress = (id, data) => {
  return put(`sucursales/${id}/address`, data);
};
const editSucursalContact = (id, data) => {
  return put(`sucursales/${id}/contact`, data);
};

const deleteSucursalAddress = (companyId, addressId) => {
  return destroy(`sucursales/${companyId}/address/${addressId}`);
};
const deleteSucursalContact = (companyId, contactId) => {
  return destroy(`sucursales/${companyId}/contact/${contactId}`);
};

const SucursalService = {
  createSucursal,
  addAddress,
  addContact,
  toggleSucursalStatus,
  getAllSucursales,
  getEnabledSucursales,
  getDisabledSucursales,
  getSucursalsBySearch,
  getSucursal,
  editSucursalData,
  editSucursalAddress,
  editSucursalContact,
  deleteSucursalAddress,
  deleteSucursalContact,
};

export default SucursalService;
