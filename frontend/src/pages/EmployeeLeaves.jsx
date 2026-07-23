import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeLeaves } from "../Services/LeaveService";

function EmployeeLeaves() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getEmployeeLeaves(id)
            .then((response) => {
                setLeaves(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch employee leaves.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "60vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-3" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container-fluid py-2">
            
            {/* Top Back Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
                <button className="back-btn-link bg-transparent border-0" onClick={() => navigate(`/admin/employee-details/${id}`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                    <span>Details</span>
                </button>
                <h3 className="mb-0 fw-bold text-dark">Employee Leave History</h3>
            </div>

            <div className="card shadow-premium border-0 rounded-4">
                <div className="card-body p-4">
                    <div className="table-container">
                        <table className="table table-striped table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Leave Type</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Admin Comment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted py-5">
                                            No Leaves Applied
                                        </td>
                                    </tr>
                                ) : (
                                    leaves.map((leave) => (
                                        <tr key={leave.id}>
                                            <td className="fw-semibold text-secondary">#{leave.id}</td>
                                            <td className="fw-semibold text-dark">{leave.leavetype}</td>
                                            <td>{leave.fromdate}</td>
                                            <td>{leave.todate}</td>
                                            <td className="text-muted">{leave.reason}</td>
                                            <td>
                                                <span className={`badge badge-premium ${
                                                    leave.status === "APPROVED" ? "bg-success-subtle text-success border border-success-subtle" : 
                                                    leave.status === "REJECTED" ? "bg-danger-subtle text-danger border border-danger-subtle" : 
                                                    "bg-warning-subtle text-warning border border-warning-subtle"
                                                }`}>
                                                    {leave.status}
                                                </span>
                                            </td>
                                            <td className="text-secondary">{leave.admincomment || <span className="text-muted">-</span>}</td>
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

export default EmployeeLeaves;
