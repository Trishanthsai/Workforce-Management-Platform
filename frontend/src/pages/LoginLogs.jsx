import React, { useEffect, useState } from "react";
import { getLoginLogs } from "../Services/LoginLogService";

function LoginLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getLoginLogs()
            .then((response) => {
                // Sort by ID descending so newest logs are first
                const sorted = response.data.sort((a, b) => b.id - a.id);
                setLogs(sorted);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load login logs.");
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
            <h2>Login Logs</h2>
            <p className="text-muted">Track user login and logout activities.</p>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm mt-3">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Login Time</th>
                                    <th>Logout Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center text-muted py-4">
                                            No Login Logs Available
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map((log) => (
                                        <tr key={log.id}>
                                            <td>{log.id}</td>
                                            <td className="fw-semibold text-primary">
                                                {log.employee ? log.employee.username : "N/A"}
                                            </td>
                                            <td>
                                                {log.loginTime ? new Date(log.loginTime).toLocaleString() : "N/A"}
                                            </td>
                                            <td>
                                                {log.logoutTime ? (
                                                    <div>
                                                        <span className="badge bg-secondary px-2 py-1 me-2">Logged Out</span>
                                                        {new Date(log.logoutTime).toLocaleString()}
                                                    </div>
                                                ) : (
                                                    <span className="badge bg-success px-2 py-1">Active Session</span>
                                                )}
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

export default LoginLogs;