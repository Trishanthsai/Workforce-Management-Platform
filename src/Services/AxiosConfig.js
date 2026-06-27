import axios from "axios";

let clientRequestTimes = [];

axios.interceptors.request.use(
    (config) => {
        const now = Date.now();
        // Filter out requests older than 1 minute (60000 ms)
        clientRequestTimes = clientRequestTimes.filter(time => now - time < 60000);

        if (clientRequestTimes.length >= 50) {
            alert("Rate limit exceeded. Please wait a moment before sending more requests.");
            return Promise.reject(new Error("Rate limit exceeded"));
        }
        clientRequestTimes.push(now);

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