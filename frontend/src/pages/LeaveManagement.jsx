import React, { useEffect, useState } from "react";
import { getAllLeaves, approveLeave, rejectLeave, deleteLeave } from "../Services/LeaveService";

function LeaveManagement() {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadLeaves();
    }, []);

    const loadLeaves = () => {
        getAllLeaves()
            .then((response) => {
                // Sort leaves by ID descending (newest requests first)
                const sorted = response.data.sort((a, b) => b.id - a.id);
                setLeaves(sorted);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load leave requests.");
                setLoading(false);
            });
    };

    const handleApprove = (id) => {
        const comment = prompt("Enter approval comment (optional):");
        if (comment === null) return; // User cancelled prompt

        approveLeave(id, comment)
            .then(() => {
                alert("Leave approved successfully.");
                loadLeaves();
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to approve leave.");
            });
    };

    const handleReject = (id) => {
        const comment = prompt("Enter rejection comment:");
        if (comment === null) return; // User cancelled prompt
        if (comment.trim() === "") {
            alert("Comment is required for rejection.");
            return;
        }

        rejectLeave(id, comment)
            .then(() => {
                alert("Leave rejected successfully.");
                loadLeaves();
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to reject leave.");
            });
    };

    const handleDeleteLeave = (id) => {
        if (!window.confirm("Are you sure you want to delete this leave request?")) {
            return;
        }

        deleteLeave(id)
            .then(() => {
                alert("Leave request deleted successfully.");
                loadLeaves();
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to delete leave request.");
            });
    };

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
            <h2 className="mb-4">Leave Management</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Employee</th>
                                    <th>Leave Type</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Admin Comment</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="text-center text-muted py-4">
                                            No Leave Requests Available
                                        </td>
                                    </tr>
                                ) : (
                                    leaves.map((leave) => (
                                        <tr key={leave.id}>
                                            <td>{leave.id}</td>
                                            <td className="fw-semibold">
                                                {leave.employee ? leave.employee.name : "N/A"}
                                            </td>
                                            <td>{leave.leavetype}</td>
                                            <td>{leave.fromdate}</td>
                                            <td>{leave.todate}</td>
                                            <td>{leave.reason}</td>
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
                                            <td>
                                                {leave.status === "PENDING" ? (
                                                    <div className="d-flex gap-2">
                                                        <button
                                                            className="btn btn-success btn-sm fw-semibold"
                                                            onClick={() => handleApprove(leave.id)}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm fw-semibold"
                                                            onClick={() => handleReject(leave.id)}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="btn btn-outline-danger btn-sm fw-semibold"
                                                        onClick={() => handleDeleteLeave(leave.id)}
                                                    >
                                                        Delete
                                                    </button>
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

export default LeaveManagement;