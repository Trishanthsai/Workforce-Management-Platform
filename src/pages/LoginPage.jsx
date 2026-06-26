import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/AuthService";

function LoginPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {

        if (!username || !password) {
            alert("Enter Username and Password");
            return;
        }

        login({
            username,
            password
        })
        .then((response) => {

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "username",
                response.data.username
            );

            if (response.data.role === "ADMIN") {

                navigate("/admin-dashboard");

            }
            else {

                navigate("/employee-dashboard");

            }

        })
        .catch(() => {

            alert("Invalid Username or Password");

        });

    };

    return (

        <div className="container-fluid vh-100">

            <div className="row h-100">

                <div className="col-lg-6 d-none d-lg-flex bg-dark text-white justify-content-center align-items-center">

                    <div>

                        <h1>Workforce Management Platform</h1>

                        <p>

                            Manage employees, tasks, leaves,
                            announcements and reports.

                        </p>

                    </div>

                </div>

                <div className="col-lg-6 d-flex justify-content-center align-items-center">

                    <div
                        className="card shadow"
                        style={{ width: "400px" }}
                    >

                        <div className="card-body">

                            <h3 className="text-center mb-4">

                                Login

                            </h3>

                            <div className="mb-3">

                                <label className="form-label">

                                    Username

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Password

                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                            </div>

                            <button
                                className="btn btn-dark w-100"
                                onClick={handleLogin}
                            >

                                Login

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default LoginPage;