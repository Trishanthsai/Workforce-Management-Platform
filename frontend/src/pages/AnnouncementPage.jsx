
import React, { useEffect, useState } from "react";
import {
    getAnnouncements,
    publishAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} from "../Services/AnnouncementService";

function AnnouncementPage() {

    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadAnnouncements();
    }, []);

    const loadAnnouncements = () => {

        getAnnouncements()
            .then((response) => {
                setAnnouncements(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const handlePublish = () => {

        if (!title || !message) {
            alert("Please fill all fields");
            return;
        }

        const announcement = {
            title,
            message
        };

        if (editingId === null) {

            publishAnnouncement(announcement)
                .then(() => {

                    alert("Announcement Published");

                    setTitle("");
                    setMessage("");

                    loadAnnouncements();

                })
                .catch((error) => {
                    console.log(error);
                });

        } else {

            updateAnnouncement(editingId, announcement)
                .then(() => {

                    alert("Announcement Updated");

                    setEditingId(null);
                    setTitle("");
                    setMessage("");

                    loadAnnouncements();

                })
                .catch((error) => {
                    console.log(error);
                });

        }

    };

    const handleEdit = (announcement) => {

        setEditingId(announcement.id);
        setTitle(announcement.title);
        setMessage(announcement.message);

    };

    const handleDelete = (id) => {

        if (!window.confirm("Delete this announcement?"))
            return;

        deleteAnnouncement(id)
            .then(() => {

                alert("Deleted Successfully");

                loadAnnouncements();

            })
            .catch((error) => {
                console.log(error);
            });

    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">
                Announcement Management
            </h2>

            <div className="card shadow-sm mb-4">

                <div className="card-body">

                    <div className="mb-3">

                        <label className="form-label">
                            Announcement Title
                        </label>

                        <input
                            className="form-control"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Message
                        </label>

                        <textarea
                            className="form-control"
                            rows="4"
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                        />

                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handlePublish}
                    >
                        {
                            editingId === null
                                ? "Publish Announcement"
                                : "Update Announcement"
                        }
                    </button>

                </div>

            </div>

            <h4 className="mb-3">
                Published Announcements
            </h4>

            {

                announcements.length === 0 ?

                    (

                        <div className="alert alert-secondary">

                            No announcements found

                        </div>

                    )

                    :

                    (

                        announcements.map((announcement) => (

                            <div
                                className="card shadow-sm mb-3"
                                key={announcement.id}
                            >

                                <div className="card-body">

                                    <h5>

                                        {announcement.title}

                                    </h5>

                                    <p>

                                        {announcement.message}

                                    </p>

                                    <small className="text-muted">

                                        Posted By :
                                        {" "}
                                        {announcement.createdBy}

                                        <br />

                                        {
                                            announcement.createdat?.replace(
                                                "T",
                                                " "
                                            )
                                        }

                                    </small>

                                    <div className="mt-3">

                                        <button
                                            className="btn btn-secondary me-2"
                                            onClick={() =>
                                                handleEdit(
                                                    announcement
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                handleDelete(
                                                    announcement.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    )

            }

        </div>

    );

}

export default AnnouncementPage;