import { destroy, get, post, put } from "../utils/requests";

const createCompany = (data) => {
  return post("companies", data);
};
const addAddress = (id, data) => {
  return post(`companies/${id}/address`, data);
};
const addContact = (id, data) => {
  return post(`companies/${id}/contact`, data);
};
const toggleCompanyStatus = (id, data) => {
  return post(`companies/${id}/enabled`, data);
};

const getAllCompanies = () => {
  return get("companies");
};
const getEnabledCompanies = () => {
  return get("companies?isEnabled=true");
};
const getDisabledCompanies = () => {
  return get("companies?isEnabled=false");
};
const getCompanysBySearch = (word) => {
  return get(`companies/searchby?searchby=${word}`);
};
const getCompany = (id) => {
  return get(`companies/${id}`);
};

const getJobsByCompany = (id) => {
  return get(`companies/${id}/jobpositions`);
};

const editCompanyData = (id, data) => {
  return put(`companies/${id}/data`, data);
};
const editCompanyAddress = (id, data) => {
  return put(`companies/${id}/address`, data);
};
const editCompanyContact = (id, data) => {
  return put(`companies/${id}/contact`, data);
};

const deleteCompanyAddress = (companyId, addressId) => {
  return destroy(`companies/${companyId}/address/${addressId}`);
};
const deleteCompanyContact = (companyId, contactId) => {
  return destroy(`companies/${companyId}/contact/${contactId}`);
};

const CompanyService = {
  createCompany,
  addAddress,
  addContact,
  toggleCompanyStatus,
  getAllCompanies,
  getEnabledCompanies,
  getDisabledCompanies,
  getCompanysBySearch,
  getCompany,
  getJobsByCompany,
  editCompanyData,
  editCompanyAddress,
  editCompanyContact,
  deleteCompanyAddress,
  deleteCompanyContact,
};

export default CompanyService;
