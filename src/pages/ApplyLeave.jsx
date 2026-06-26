import React, { useState } from "react";
import { applyLeave } from "../Services/LeaveService";

function ApplyLeave() {

    const [leave, setLeave] = useState({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: ""
    });

    const handleChange = (e) => {
        setLeave({
            ...leave,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!leave.leaveType || !leave.startDate || !leave.endDate || !leave.reason) {
            alert("Please fill in all fields.");
            return;
        }

        const payload = {
            leavetype: leave.leaveType,
            fromdate: leave.startDate,
            todate: leave.endDate,
            reason: leave.reason
        };

        applyLeave(payload)
            .then((res) => {
                alert("Leave request submitted successfully!");
                setLeave({
                    leaveType: "",
                    startDate: "",
                    endDate: "",
                    reason: ""
                });
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to submit leave request.");
            });
    };

    return (
        <div className="container-fluid p-4">

            <h2>Apply Leave</h2>

            <div className="card shadow-sm mt-3">

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">
                                Leave Type
                            </label>

                            <select
                                className="form-select"
                                name="leaveType"
                                value={leave.leaveType}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select Leave Type
                                </option>

                                <option value="Sick Leave">
                                    Sick Leave
                                </option>

                                <option value="Casual Leave">
                                    Casual Leave
                                </option>

                                <option value="Vacation">
                                    Vacation
                                </option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Start Date
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="startDate"
                                value={leave.startDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                End Date
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                value={leave.endDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Reason
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                name="reason"
                                value={leave.reason}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark"
                        >
                            Submit Leave Request
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default ApplyLeave;