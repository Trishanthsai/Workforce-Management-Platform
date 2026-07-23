import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getEmployeeById,
    updateEmployee
} from "../Services/Employeeservice";

const UpdateEmployeeComponent = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [salary, setSalary] = useState("");
    const [designation, setDesignation] = useState("");
    const [email, setEmail] = useState("");
    const [phone_no, setPhoneNo] = useState("");

    useEffect(() => {

        getEmployeeById(id)
            .then((response) => {

                const employee = response.data;

                setName(employee.name);
                setAge(employee.age);
                setSalary(employee.salary);
                setDesignation(employee.designation);
                setEmail(employee.email);
                setPhoneNo(employee.phone_no);

            })
            .catch((error) => {
                console.log(error);
            });

    }, [id]);

    const handleUpdateEmployee = (e) => {

        e.preventDefault();

        const employee = {

            name,
            age,
            salary,
            designation,
            email,
            phone_no

        };

        updateEmployee(id, employee)
            .then(() => {

                alert("Employee Updated Successfully");

                navigate("/employees");

            })
            .catch((error) => {

                console.log(error);

            });

    };

    return (
        <div className="container-fluid py-2">
            
            {/* Top Back Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
                <button className="back-btn-link bg-transparent border-0" onClick={() => navigate("/employees")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                    <span>Employees</span>
                </button>
                <h3 className="mb-0 fw-bold text-dark">Update Employee</h3>
            </div>

            <div className="card shadow-premium border-0 rounded-4 overflow-hidden" style={{ maxWidth: "750px", margin: "0 auto" }}>
                <div className="card-body p-4 p-md-5">
                    <form onSubmit={handleUpdateEmployee}>
                        <div className="row g-3">
                            
                            <div className="col-md-12">
                                <label className="form-label fw-semibold text-secondary">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-secondary">Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-secondary">Designation</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-secondary">Salary (Monthly)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-secondary">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phone_no}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label fw-semibold text-secondary">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                        </div>

                        <div className="d-flex gap-3 mt-5">
                            <button
                                type="submit"
                                className="btn btn-primary px-4 py-2 fw-semibold shadow-sm"
                            >
                                Save Updates
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4 py-2 fw-semibold"
                                onClick={() => navigate("/employees")}
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmployeeComponent;