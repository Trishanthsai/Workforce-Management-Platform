import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getLoginLogs = () =>
    axios.get(`${BASE_URL}/admin/loginlogs`, getAuthHeader());
