import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../Services/Employeeservice";

function EmployeeDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    useEffect(() => {

        getEmployeeById(id)
            .then((response) => {
                setEmployee(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [id]);

    if (!employee) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="container-fluid py-2">
            
            {/* Top Back Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
                <button className="back-btn-link bg-transparent border-0" onClick={() => navigate("/employees")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                    <span>Employees</span>
                </button>
                <h3 className="mb-0 fw-bold text-dark">Employee details</h3>
            </div>

            <div className="card shadow-premium border-0 rounded-4">
                <div className="card-body p-4 p-md-5">
                    <div className="row g-4 align-items-center">
                        
                        {/* Left Column - Avatar & Core Info */}
                        <div className="col-lg-4 text-center border-end-lg mb-4 mb-lg-0">
                            <div className="position-relative d-inline-block mb-3">
                                <div className="profile-avatar-container" style={{ width: "140px", height: "140px" }}>
                                    {employee.profilePic ? (
                                        <img 
                                            src={employee.profilePic} 
                                            alt={employee.name} 
                                            className="profile-avatar-img"
                                        />
                                    ) : (
                                        <div className="profile-avatar-placeholder" style={{ fontSize: "3.5rem" }}>
                                            {employee.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <span className="position-absolute bottom-0 end-0 badge badge-premium bg-success border border-white text-uppercase" style={{ transform: "translate(10%, 10%)" }}>
                                    ACTIVE
                                </span>
                            </div>
                            <h3 className="mt-3 fw-bold text-dark mb-1">{employee.name}</h3>
                            <p className="text-muted fw-semibold mb-2">{employee.designation}</p>
                            <span className="badge badge-premium bg-secondary-subtle text-secondary text-uppercase border">{employee.role}</span>
                        </div>

                        {/* Right Column - Data fields */}
                        <div className="col-lg-8 ps-lg-5">
                            <h4 className="fw-bold mb-4 text-secondary">Information Details</h4>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block">Employee ID</small>
                                        <span className="fw-semibold fs-5 text-dark">#{employee.id}</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block">Email Address</small>
                                        <span className="fw-semibold fs-5 text-dark text-break">{employee.email}</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block">Phone Number</small>
                                        <span className="fw-semibold fs-5 text-dark">{employee.phone_no || "N/A"}</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block">Age</small>
                                        <span className="fw-semibold fs-5 text-dark">{employee.age} years</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block">Monthly Salary</small>
                                        <span className="fw-bold fs-5 text-success">₹{employee.salary?.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Administration actions */}
                            <div className="mt-5 d-flex flex-wrap gap-2">
                                <button
                                    className="btn btn-primary px-4 py-2 fw-semibold shadow-sm d-flex align-items-center gap-2"
                                    onClick={() => navigate(`/admin/employee/${employee.id}/tasks`)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                                    <span>View Tasks</span>
                                </button>

                                <button
                                    className="btn btn-warning px-4 py-2 fw-semibold shadow-sm d-flex align-items-center gap-2"
                                    onClick={() => navigate(`/admin/tasks?employeeId=${employee.id}`)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                                    <span>Assign Task</span>
                                </button>

                                <button
                                    className="btn btn-outline-primary px-4 py-2 fw-semibold d-flex align-items-center gap-2"
                                    onClick={() => navigate(`/admin/employee/${employee.id}/leaves`)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    <span>View Leaves</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetails;