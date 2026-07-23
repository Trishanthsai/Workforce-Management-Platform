import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getAllTasks = () =>
    axios.get(`${BASE_URL}/admin/task`, getAuthHeader());

export const getMyTasks = () =>
    axios.get(`${BASE_URL}/employee/task`, getAuthHeader());

export const assignTask = (task) =>
    axios.post(
        `${BASE_URL}/admin/task`,
        task,
        getAuthHeader()
    );

export const deleteTask = (id) =>
    axios.delete(
        `${BASE_URL}/admin/task/${id}`,
        getAuthHeader()
    );

export const approveTask = (id) =>
    axios.put(
        `${BASE_URL}/admin/task/${id}/approve`,
        {},
        getAuthHeader()
    );

export const rejectTask = (id) =>
    axios.put(
        `${BASE_URL}/admin/task/${id}/reject`,
        {},
        getAuthHeader()
    );

export const reassignTask = (taskId, employeeId) =>
    axios.put(
        `${BASE_URL}/admin/task/${employeeId}/reassign/${taskId}`,
        {},
        getAuthHeader()
    );

export const updateTaskStatus = (id, status) =>
    axios.put(
        `${BASE_URL}/employee/task/${id}/status`,
        { status },
        getAuthHeader()
    );
export const getEmployeeTasks = (id) =>
    axios.get(`${BASE_URL}/admin/employee/${id}/tasks`);