import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getEmployeeLeaves = (id) =>
    axios.get(`${BASE_URL}/admin/employee/${id}/leaves`, getAuthHeader());

export const getAllLeaves = () =>
    axios.get(`${BASE_URL}/admin/leaves`, getAuthHeader());

export const approveLeave = (id, comment) =>
    axios.put(`${BASE_URL}/admin/leave/${id}/approve`, { comment }, getAuthHeader());

export const rejectLeave = (id, comment) =>
    axios.put(`${BASE_URL}/admin/leave/${id}/reject`, { comment }, getAuthHeader());

export const getMyLeaves = () =>
    axios.get(`${BASE_URL}/employee/leave`, getAuthHeader());

export const applyLeave = (leaveRequest) =>
    axios.post(`${BASE_URL}/employee/applyleave`, leaveRequest, getAuthHeader());

export const deleteLeave = (id) =>
    axios.delete(`${BASE_URL}/admin/leave/${id}`, getAuthHeader());
