import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../Services/Employeeservice';

export const Employeecomponent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [designation, setDesgination] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhoneno] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [roleInput, setRoleInput] = useState("EMPLOYEE");

  const resetForm = () => {
    setName("");
    setAge("");
    setSalary("");
    setDesgination("");
    setEmail("");
    setPhoneno("");
    setUsernameInput("");
    setPasswordInput("");
    setRoleInput("EMPLOYEE");
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!name || !age || !salary || !designation || !email || !usernameInput || !passwordInput || !roleInput) {
      alert("Please fill in all required fields.");
      return;
    }

    const employeeData = {
      name,
      age: Number(age),
      salary: Number(salary),
      designation,
      email,
      phone_no: Number(phone_no),
      username: usernameInput,
      password: passwordInput,
      role: roleInput
    };

    addEmployee(employeeData)
      .then(() => {
        alert("Employee registered successfully!");
        resetForm();
        navigate("/employees");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to register employee.");
      });
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div className="card-header bg-dark text-white p-4">
          <h2 className="mb-0">Register Employee</h2>
        </div>
        <div className="card-body p-4">
          <form onSubmit={submitForm}>
            <div className="row g-3">
              <div className="col-md-12">
                <label className="form-label fw-semibold text-secondary">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter employee's name"
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
                  placeholder="Enter age"
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
                  placeholder="Enter designation"
                  value={designation}
                  onChange={(e) => setDesgination(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary">Salary (Monthly)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter salary"
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
                  placeholder="Enter phone number"
                  value={phone_no}
                  onChange={(e) => setPhoneno(e.target.value)}
                />
              </div>

              <div className="col-md-12">
                <label className="form-label fw-semibold text-secondary">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary">Role</label>
                <select
                  className="form-select"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  required
                >
                  <option value="EMPLOYEE">EMPLOYEE</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </div>

            <div className="d-flex gap-3 mt-5">
              <button type="submit" className="btn btn-primary px-4 py-2 fw-semibold">
                Submit Registration
              </button>
              <button type="button" className="btn btn-secondary px-4 py-2 fw-semibold" onClick={resetForm}>
                Reset
              </button>
              <button type="button" className="btn btn-outline-secondary px-4 py-2 fw-semibold ms-auto" onClick={() => navigate("/employees")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};