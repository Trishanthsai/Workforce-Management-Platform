import React, { useEffect, useState } from "react";
import { getEmployeeDashboardData } from "../Services/DashboardService";
import { getMyTasks } from "../Services/TaskServices";

function EmployeeDashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        Promise.all([getEmployeeDashboardData(), getMyTasks()])
            .then(([dashRes, tasksRes]) => {
                setDashboard(dashRes.data);
                // Sort tasks descending and take the 5 most recent
                const sorted = tasksRes.data.sort((a, b) => b.id - a.id).slice(0, 5);
                setTasks(sorted);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load employee dashboard.");
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

    if (error) {
        return (
            <div className="alert alert-danger m-3" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2>Employee Dashboard</h2>
            <p className="text-muted">Welcome back, {dashboard?.name || "Employee"}</p>

            <div className="row mt-4">
                <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div className="card shadow-sm border-0 metric-card-total">
                        <div className="card-body p-4">
                            <h6 className="text-uppercase text-white-75 small mb-2">Total Tasks</h6>
                            <h3 className="fw-bold mb-0">{dashboard?.totaltask || 0}</h3>
                        </div>
                    </div>
                </div>
 
                <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div className="card shadow-sm border-0 metric-card-pending">
                        <div className="card-body p-4">
                            <h6 className="text-uppercase text-white-75 small mb-2">Pending Tasks</h6>
                            <h3 className="fw-bold mb-0">{dashboard?.pendingtask || 0}</h3>
                        </div>
                    </div>
                </div>
 
                <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div className="card shadow-sm border-0 metric-card-completed">
                        <div className="card-body p-4">
                            <h6 className="text-uppercase text-white-75 small mb-2">Completed Tasks</h6>
                            <h3 className="fw-bold mb-0">{dashboard?.completedtask || 0}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm mt-4 border-0">
                <div className="card-body p-4">
                    <h5 className="fw-bold mb-3 text-secondary">My Recent Tasks</h5>

                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Task</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center text-muted py-4">
                                            No Tasks Assigned
                                        </td>
                                    </tr>
                                ) : (
                                    tasks.map((task) => (
                                        <tr key={task.id}>
                                            <td>{task.id}</td>
                                            <td className="fw-semibold">{task.title}</td>
                                            <td>
                                                <span className={`badge ${
                                                    task.priority === "HIGH" ? "bg-danger" :
                                                    task.priority === "MEDIUM" ? "bg-warning text-dark" :
                                                    "bg-info text-dark"
                                                }`}>
                                                    {task.priority}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${
                                                    task.status === "COMPLETED" ? "bg-success" :
                                                    task.status === "IN_PROGRESS" ? "bg-primary" :
                                                    task.status === "COMPLETION_REQUESTED" ? "bg-info text-dark" :
                                                    "bg-secondary"
                                                }`}>
                                                    {task.status}
                                                </span>
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

export default EmployeeDashboard;