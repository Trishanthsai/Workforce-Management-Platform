import React, { useEffect, useState } from "react";
import { getMyLeaves } from "../Services/LeaveService";

function MyLeaves() {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getMyLeaves()
            .then((response) => {
                // Sort leaves by ID descending (newest first)
                const sorted = response.data.sort((a, b) => b.id - a.id);
                setLeaves(sorted);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load leave history.");
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
            <h2>My Leave History</h2>
            <p className="text-muted">Track all your leave requests.</p>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm mt-3">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Leave Type</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Status</th>
                                    <th>Admin Comment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted py-4">
                                            No Leaves Applied
                                        </td>
                                    </tr>
                                ) : (
                                    leaves.map((leave) => (
                                        <tr key={leave.id}>
                                            <td>{leave.id}</td>
                                            <td className="fw-semibold">{leave.leavetype}</td>
                                            <td>{leave.fromdate}</td>
                                            <td>{leave.todate}</td>
                                            <td>
                                                <span
                                                    className={
                                                        leave.status === "APPROVED"
                                                            ? "badge bg-success"
                                                            : leave.status === "REJECTED"
                                                            ? "badge bg-danger"
                                                            : "badge bg-warning text-dark"
                                                    }
                                                >
                                                    {leave.status}
                                                </span>
                                            </td>
                                            <td>{leave.admincomment || <span className="text-muted">-</span>}</td>
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

export default MyLeaves;