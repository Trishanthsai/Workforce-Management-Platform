import React, { useEffect, useState } from 'react';
import { getEmployees } from '../Services/Employeeservice';
import { getDashboardData } from '../Services/DashboardService';
import { getAuditLogs } from '../Services/AuditLogService';

function AdminDashboard() {

    const [dashboard, setDashboard] = useState({});
    const [employeeCount, setEmployeeCount] = useState(0);
    const [auditLogs, setAuditLogs] = useState([]);

    useEffect(() => {

        getDashboardData()
            .then((response) => {
                setDashboard(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        getAuditLogs()
            .then((response) => {
                setAuditLogs(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        getEmployees()
            .then((response) => {
                setEmployeeCount(response.data.length);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    return (
        <div>

            <h2>Admin Dashboard</h2>
            <p>Welcome back, Admin</p>

            <div className="row mt-4">
                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                    <div className="card shadow-sm border-0 metric-card-employees">
                        <div className="card-body p-4">
                            <h6 className="text-uppercase text-white-75 small mb-2">Total Employees</h6>
                            <h3 className="fw-bold mb-0">{employeeCount}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                    <div className="card shadow-sm border-0 metric-card-total">
                        <div className="card-body p-4">
                            <h6 className="text-uppercase text-white-75 small mb-2">Total Tasks</h6>
                            <h3 className="fw-bold mb-0">{dashboard.totaltasks || 0}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                    <div className="card shadow-sm border-0 metric-card-pending">
                        <div className="card-body p-4">
                            <h6 className="text-uppercase text-white-75 small mb-2">Pending Tasks</h6>
                            <h3 className="fw-bold mb-0">{dashboard.pendingtasks || 0}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                    <div className="card shadow-sm border-0 metric-card-announcements">
                        <div className="card-body p-4">
                            <h6 className="text-uppercase text-white-75 small mb-2">Announcements</h6>
                            <h3 className="fw-bold mb-0">{dashboard.announcement || 0}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-4 shadow-sm">

                <div className="card-body">

                    <h5>Recent Activities</h5>

                    <div className="table-responsive">

                        <table className="table table-hover">

                            <thead>
                            <tr>
                                <th>User</th>
                                <th>Action</th>
                                <th>Time</th>
                            </tr>
                            </thead>

                            <tbody>

                            {
                                auditLogs.slice(0, 5).map((log) => (
                                    <tr key={log.id}>
                                        <td>{log.username}</td>
                                        <td>{log.action}</td>
                                        <td>{log.timestamp ? new Date(log.timestamp).toLocaleString() : "N/A"}</td>
                                    </tr>
                                ))
                            }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;