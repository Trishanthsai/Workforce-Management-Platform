import React, { useState } from "react";
import { changeEmployeePassword } from "../Services/Employeeservice";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!oldPassword || !newPassword || !confirmPassword) {
            alert("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const payload = {
            oldpassword: oldPassword,
            newPassword: newPassword
        };

        changeEmployeePassword(payload)
            .then((response) => {
                alert(response.data);
                if (response.data.includes("successfully")) {
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    const role = localStorage.getItem("role");
                    navigate(role === "ADMIN" ? "/admin/profile" : "/employee/profile");
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to change password.");
            });
    }

    return (
        <div className="container py-4">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: "500px", margin: "0 auto" }}>
                <div className="card-header bg-dark text-white p-4">
                    <h3 className="mb-0">Change Password</h3>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold text-secondary">Old Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold text-secondary">New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold text-secondary">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="d-grid gap-2 mt-4">
                            <button type="submit" className="btn btn-primary py-2 fw-semibold">
                                Update Password
                            </button>
                            <button type="button" className="btn btn-outline-secondary py-2 fw-semibold" onClick={() => {
                                const role = localStorage.getItem("role");
                                navigate(role === "ADMIN" ? "/admin/profile" : "/employee/profile");
                            }}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;