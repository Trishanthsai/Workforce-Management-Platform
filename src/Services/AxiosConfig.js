import axios from "axios";

axios.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 429) {
            alert("Rate limit exceeded. Please try again later.");
        }
        return Promise.reject(error);
    }
);

export default axios;