import React, { useEffect, useState } from "react";
import { getAnnouncements } from "../Services/AnnouncementService";

function EmployeeAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getAnnouncements()
            .then((response) => {
                // Sort by ID descending so newest is first
                const sorted = response.data.sort((a, b) => b.id - a.id);
                setAnnouncements(sorted);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load announcements.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2 className="mb-4">Company Announcements</h2>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            {announcements.length === 0 ? (
                <div className="alert alert-info">No announcements have been published yet.</div>
            ) : (
                announcements.map((ann) => (
                    <div className="card shadow-sm mb-3 border-0 rounded-3" key={ann.id}>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5 className="fw-bold mb-0 text-primary">{ann.title}</h5>
                                <small className="text-muted">
                                    {ann.createdat ? new Date(ann.createdat).toLocaleString() : ""}
                                </small>
                            </div>
                            <p className="card-text text-secondary mb-0" style={{ whiteSpace: "pre-line" }}>
                                {ann.message}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default EmployeeAnnouncements;