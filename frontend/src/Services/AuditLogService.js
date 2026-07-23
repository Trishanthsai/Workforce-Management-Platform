import axios from "axios";

const AUDIT_URL =
"http://localhost:8080/admin/auditlogs";

export const getAuditLogs = () =>
    axios.get(AUDIT_URL);