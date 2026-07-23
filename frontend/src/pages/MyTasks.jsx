import React, { useEffect, useState } from "react";
import {
    getMyTasks,
    updateTaskStatus
} from "../Services/TaskServices";

function MyTasks() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {

        getMyTasks()
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const startTask = (id) => {

        updateTaskStatus(id, "IN_PROGRESS")
            .then(() => {
                loadTasks();
            })
            .catch(console.log);

    };

    const requestCompletion = (id) => {

        const confirmRequest = window.confirm(
            "Are you sure you have completed this task?"
        );

        if (!confirmRequest) return;

        updateTaskStatus(id, "COMPLETION_REQUESTED")
            .then(() => {
                alert("Completion request sent to Admin.");
                loadTasks();
            })
            .catch(console.log);

    };

    const badgeColor = (status) => {

        switch (status) {

            case "PENDING":
                return "secondary";

            case "IN_PROGRESS":
                return "primary";

            case "COMPLETION_REQUESTED":
                return "warning";

            case "COMPLETED":
                return "success";

            default:
                return "dark";

        }

    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">
                My Tasks
            </h2>

            <div className="card shadow">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-bordered table-hover">

                            <thead>

                            <tr>

                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Priority</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>

                            </thead>

                            <tbody>

                            {

                                tasks.map(task => (

                                    <tr key={task.id}>

                                        <td>{task.id}</td>

                                        <td className="fw-semibold">{task.title}</td>

                                        <td>{task.description}</td>

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
                                                className={`badge bg-${badgeColor(task.status)}`}
                                            >
                                                {task.status}
                                            </span>

                                        </td>

                                        <td>

                                            {

                                                task.status === "PENDING" && (

                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => startTask(task.id)}
                                                    >
                                                        Start Task
                                                    </button>

                                                )

                                            }

                                            {

                                                task.status === "IN_PROGRESS" && (

                                                    <button
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() => requestCompletion(task.id)}
                                                    >
                                                        Request Completion
                                                    </button>

                                                )

                                            }

                                            {

                                                task.status === "COMPLETION_REQUESTED" && (

                                                    <span className="text-warning fw-bold">
                                                        Waiting for Admin Approval
                                                    </span>

                                                )

                                            }

                                            {

                                                task.status === "COMPLETED" && (

                                                    <span className="text-success fw-bold">
                                                        Completed
                                                    </span>

                                                )

                                            }

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

export default MyTasks;