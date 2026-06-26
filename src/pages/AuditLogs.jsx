import React, { useEffect, useState } from "react";
import { getAuditLogs } from "../Services/AuditLogService";

function AuditLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getAuditLogs()
            .then((response) => {
                // Sort by ID descending so newest logs are first
                const sorted = response.data.sort((a, b) => b.id - a.id);
                setLogs(sorted);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load audit logs.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2>Audit Logs</h2>
            <p className="text-muted">Track all important system activities.</p>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm mt-3">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Action</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center text-muted py-4">
                                            No Audit Logs Available
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map((log) => (
                                        <tr key={log.id}>
                                            <td>{log.id}</td>
                                            <td className="fw-semibold text-primary">{log.username}</td>
                                            <td>
                                                <span className="badge bg-secondary px-2 py-1 text-uppercase">
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td>
                                                {log.timestamp ? new Date(log.timestamp).toLocaleString() : "N/A"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuditLogs;