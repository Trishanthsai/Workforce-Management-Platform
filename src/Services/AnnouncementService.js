import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getAnnouncements = () =>
    axios.get(`${BASE_URL}/announcements`);

export const publishAnnouncement = (announcement) =>
    axios.post(`${BASE_URL}/admin/announcement`, announcement);

export const updateAnnouncement = (id, announcement) =>
    axios.put(`${BASE_URL}/admin/announcement/${id}`, announcement);

export const deleteAnnouncement = (id) =>
    axios.delete(`${BASE_URL}/admin/announcement/${id}`);