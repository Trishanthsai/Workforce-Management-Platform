import axios from "axios";

const REST_BASE_URL = "http://localhost:8080/employee";

export const getEmployees = () =>
    axios.get(REST_BASE_URL);

export const getEmployeeById = (id) =>
    axios.get(`${REST_BASE_URL}/${id}`);

export const addEmployee = (employee) =>
    axios.post(REST_BASE_URL, employee);

export const updateEmployee = (id, employee) =>
    axios.put(`${REST_BASE_URL}/${id}`, employee);

export const deleteEmployee = (id) =>
    axios.delete(`${REST_BASE_URL}/${id}`);

export const getEmployeeProfile = () =>
    axios.get(`${REST_BASE_URL}/profile`);

export const updateEmployeeProfile = (profileData) =>
    axios.put(`${REST_BASE_URL}/profile`, profileData);

export const changeEmployeePassword = (passwordData) =>
    axios.put(`${REST_BASE_URL}/changepassword`, passwordData);