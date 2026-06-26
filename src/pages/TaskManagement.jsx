import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    getAllTasks,
    assignTask,
    deleteTask,
    approveTask,
    rejectTask,
    reassignTask
} from "../Services/TaskServices";

import { getEmployees } from "../Services/Employeeservice";

function TaskManagement() {
    const [searchParams] = useSearchParams();
    const queryEmployeeId = searchParams.get("employeeId");

    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("LOW");
    const [deadline, setDeadline] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    useEffect(() => {
        loadTasks();
        loadEmployees();
    }, []);

    useEffect(() => {
        if (queryEmployeeId) {
            setEmployeeId(queryEmployeeId);
        }
    }, [queryEmployeeId]);

    const loadTasks = () => {
        getAllTasks()
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => console.log(error));
    };

    const loadEmployees = () => {
        getEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => console.log(error));
    };

    const handleAssignTask = () => {

        if (
            !title ||
            !description ||
            !priority ||
            !employeeId ||
            !deadline
        ) {
            alert("Please fill all fields including deadline");
            return;
        }

        const task = {
            title,
            description,
            priority,
            employeeid: employeeId,
            deadline: deadline
        };

        assignTask(task)
            .then(() => {

                alert("Task Assigned Successfully");

                setTitle("");
                setDescription("");
                setPriority("LOW");
                setDeadline("");
                if (!queryEmployeeId) {
                    setEmployeeId("");
                }

                loadTasks();

            })
            .catch((error) => console.log(error));
    };

    const handleDelete = (id) => {

        if (!window.confirm("Delete this task?"))
            return;

        deleteTask(id)
            .then(() => loadTasks())
            .catch((error) => console.log(error));

    };

    const handleReassign = (taskId, employeeId) => {
        if (!employeeId) return;
        const targetEmp = employees.find(e => e.id.toString() === employeeId.toString());
        if (!targetEmp) return;

        if (!window.confirm(`Are you sure you want to reassign this task to ${targetEmp.name}?`)) {
            loadTasks();
            return;
        }

        reassignTask(taskId, employeeId)
            .then(() => {
                alert("Task Reassigned Successfully");
                loadTasks();
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to reassign task");
                loadTasks();
            });
    };

    const handleApprove = (id) => {
        approveTask(id)
            .then(() => {
                alert("Task Approved Successfully");
                loadTasks();
            })
            .catch((error) => console.log(error));
    };

    const handleReject = (id) => {
        rejectTask(id)
            .then(() => {
                alert("Task Rejected Successfully");
                loadTasks();
            })
            .catch((error) => console.log(error));
    };

    const getBadge = (status) => {

        switch (status) {

            case "PENDING":
                return "bg-secondary";

            case "IN_PROGRESS":
                return "bg-primary";

            case "COMPLETION_REQUESTED":
                return "bg-warning text-dark";

            case "COMPLETED":
                return "bg-success";

            default:
                return "bg-dark";
        }
    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">
                Task Management
            </h2>

            <div className="card shadow mb-4">

                <div className="card-body">

                    <div className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label small text-muted">Task Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Task Title"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                            />

                        </div>

                        <div className="col-md-6">
                            <label className="form-label small text-muted">Assign To Employee</label>
                            <select
                                className="form-select"
                                value={employeeId}
                                onChange={(e) =>
                                    setEmployeeId(e.target.value)
                                }
                                disabled={!!queryEmployeeId}
                            >

                                <option value="">
                                    Select Employee
                                </option>

                                {
                                    employees
                                        .filter(emp => emp.role !== "ADMIN")
                                        .map(emp => (

                                            <option
                                                key={emp.id}
                                                value={emp.id}
                                            >
                                                {emp.name}
                                            </option>

                                        ))
                                }

                            </select>

                        </div>

                        <div className="col-md-12">
                            <label className="form-label small text-muted">Task Description</label>
                            <textarea
                                rows="3"
                                className="form-control"
                                placeholder="Description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />

                        </div>

                        <div className="col-md-4">
                            <label className="form-label small text-muted">Priority</label>
                            <select
                                className="form-select"
                                value={priority}
                                onChange={(e) =>
                                    setPriority(e.target.value)
                                }
                            >

                                <option value="LOW">
                                    LOW
                                </option>

                                <option value="MEDIUM">
                                    MEDIUM
                                </option>

                                <option value="HIGH">
                                    HIGH
                                </option>

                            </select>

                        </div>

                        <div className="col-md-4">
                            <label className="form-label small text-muted">Deadline Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4 d-flex align-items-end">

                            <button
                                className="btn btn-primary w-100 py-2fw-bold"
                                onClick={handleAssignTask}
                                style={{ height: "38px" }}
                            >
                                Assign Task
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-striped table-hover align-middle">

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Employee</th>
                                    <th>Priority</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    tasks.map(task => (

                                        <tr key={task.id}>

                                            <td>{task.id}</td>

                                            <td className="fw-semibold">{task.title}</td>

                                            <td>
                                                <select
                                                    className="form-select form-select-sm fw-semibold text-primary"
                                                    value={task.employee ? task.employee.id : ""}
                                                    onChange={(e) => handleReassign(task.id, e.target.value)}
                                                    style={{ maxWidth: "200px" }}
                                                >
                                                    {employees
                                                        .filter(emp => emp.role !== "ADMIN")
                                                        .map(emp => (
                                                            <option key={emp.id} value={emp.id}>
                                                                {emp.name}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </td>

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
                                                {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No Deadline"}
                                            </td>

                                            <td>

                                                <span
                                                    className={`badge ${getBadge(task.status)}`}
                                                >
                                                    {task.status}
                                                </span>

                                            </td>

                                            <td>

                                                {
                                                    task.createdAt
                                                        ?.substring(0,10)
                                                }

                                            </td>

                                            <td>
                                                {task.status === "COMPLETION_REQUESTED" && (
                                                    <div className="d-inline-block me-2">
                                                        <button
                                                            className="btn btn-success btn-sm me-1 fw-semibold"
                                                            onClick={() => handleApprove(task.id)}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className="btn btn-warning btn-sm me-1 text-dark fw-semibold"
                                                            onClick={() => handleReject(task.id)}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                                <button
                                                    className="btn btn-danger btn-sm fw-semibold"
                                                    onClick={() =>
                                                        handleDelete(task.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>

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

export default TaskManagement;