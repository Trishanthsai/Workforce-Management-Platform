import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeTasks } from "../Services/TaskServices";

function EmployeeTasks() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getEmployeeTasks(id)
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <div className="container-fluid py-2">
            
            {/* Top Back Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
                <button className="back-btn-link bg-transparent border-0" onClick={() => navigate(`/admin/employee-details/${id}`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                    <span>Details</span>
                </button>
                <h3 className="mb-0 fw-bold text-dark">Employee Tasks</h3>
            </div>

            <div className="card shadow-premium border-0 rounded-4">
                <div className="card-body p-4">
                    <div className="table-container">
                        <table className="table table-striped table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Priority</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted py-5">
                                            No Tasks Assigned
                                        </td>
                                    </tr>
                                ) : (
                                    tasks.map(task => (
                                        <tr key={task.id}>
                                            <td className="fw-semibold text-secondary">#{task.id}</td>
                                            <td className="fw-bold text-dark">{task.title}</td>
                                            <td className="text-muted">{task.description}</td>
                                            <td>
                                                <span className={`badge badge-premium ${
                                                    task.priority === "HIGH" ? "bg-danger-subtle text-danger border border-danger-subtle" :
                                                    task.priority === "MEDIUM" ? "bg-warning-subtle text-warning border border-warning-subtle" :
                                                    "bg-info-subtle text-info border border-info-subtle"
                                                }`}>
                                                    {task.priority}
                                                </span>
                                            </td>
                                            <td className="fw-semibold text-secondary">
                                                {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No Deadline"}
                                            </td>
                                            <td>
                                                <span className={`badge badge-premium ${
                                                    task.status === "COMPLETED" ? "bg-success-subtle text-success border border-success-subtle" : 
                                                    task.status === "IN_PROGRESS" ? "bg-primary-subtle text-primary border border-primary-subtle" : 
                                                    task.status === "COMPLETION_REQUESTED" ? "bg-info-subtle text-info border border-info-subtle" : 
                                                    "bg-secondary-subtle text-secondary border"
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

export default EmployeeTasks;