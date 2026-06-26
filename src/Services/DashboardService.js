import axios from "axios";

const DASHBOARD_URL =
"http://localhost:8080/admin/dashboard";

export const getDashboardData = () =>
    axios.get(DASHBOARD_URL);

export const getEmployeeDashboardData = () =>
    axios.get("http://localhost:8080/employee/dashboard");