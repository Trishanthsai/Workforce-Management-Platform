import axios from "axios";

const BASE_URL = "http://localhost:8080/auth";

export const login = (loginData) =>
    axios.post(`${BASE_URL}/login`, loginData);

export const logout = (username) => {

    const token = localStorage.getItem("token");

    return axios.post(
        `http://localhost:8080/auth/logout?username=${username || ""}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

};