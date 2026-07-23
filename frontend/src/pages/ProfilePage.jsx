import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployeeProfile, updateEmployeeProfile } from "../Services/Employeeservice";

function ProfilePage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_no: "",
        age: "",
        address: "",
        profilePic: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        getEmployeeProfile()
            .then((res) => {
                setProfile(res.data);
                setFormData({
                    name: res.data.name || "",
                    email: res.data.email || "",
                    phone_no: res.data.phone_no || "",
                    age: res.data.age || "",
                    address: res.data.address || "",
                    profilePic: res.data.profilePic || ""
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load profile details.");
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Image size check (max 1.5MB to be safe with base64 overhead in PostgreSQL TEXT)
        if (file.size > 1.5 * 102/1 * 1024) {
            alert("Image size must be less than 1.5 MB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            const updatedForm = { ...formData, profilePic: base64String };
            
            // Instantly save profile picture
            updateEmployeeProfile(updatedForm)
                .then(() => {
                    alert("Profile photo updated successfully!");
                    loadProfile();
                })
                .catch((err) => {
                    console.error("Photo save failed:", err);
                    alert("Failed to save profile photo.");
                });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateEmployeeProfile(formData)
            .then(() => {
                alert("Profile updated successfully!");
                setIsEditing(false);
                loadProfile();
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to update profile.");
            });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "60vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-3" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container-fluid py-2">
            
            {/* Page Title with navigation */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-3">
                    <button className="back-btn-link bg-transparent border-0" onClick={() => {
                        const role = localStorage.getItem("role");
                        navigate(role === "ADMIN" ? "/admin-dashboard" : "/employee-dashboard");
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                        <span>Dashboard</span>
                    </button>
                    <h3 className="mb-0 fw-bold">My Profile</h3>
                </div>
            </div>

            <div className="card border-0 rounded-4 shadow-premium">
                <div className="card-body p-4 p-md-5">
                    <div className="row g-4">
                        
                        {/* Profile Summary Card Column */}
                        <div className="col-md-4 text-center border-end-md">
                            <div className="profile-avatar-container mb-4">
                                {profile.profilePic ? (
                                    <img 
                                        src={profile.profilePic} 
                                        alt={profile.name} 
                                        className="profile-avatar-img"
                                    />
                                ) : (
                                    <div className="profile-avatar-placeholder">
                                        {profile.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <label htmlFor="avatar-file-upload" className="profile-avatar-overlay" title="Upload Photo">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                                </label>
                                <input 
                                    type="file" 
                                    id="avatar-file-upload" 
                                    accept="image/*" 
                                    className="d-none" 
                                    onChange={handleFileChange}
                                />
                            </div>
                            
                            <h3 className="fw-bold mb-1 text-dark">{profile.name}</h3>
                            <p className="text-muted fw-semibold mb-3">{profile.designation}</p>
                           
                        </div>

                        {/* Profile Info Details / Editing Form Column */}
                        <div className="col-md-8 ps-md-4">
                            {!isEditing ? (
                                <div>
                                    <h4 className="fw-bold mb-4 text-secondary">Personal Information</h4>
                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block">Employee ID</small>
                                                <span className="fw-semibold fs-5 text-dark">#{profile.id}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block">Username</small>
                                                <span className="fw-semibold fs-5 text-dark">{profile.username}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block">Email Address</small>
                                                <span className="fw-semibold fs-5 text-dark">{profile.email}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block">Phone Number</small>
                                                <span className="fw-semibold fs-5 text-dark">{profile.phone_no || "N/A"}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block">Age</small>
                                                <span className="fw-semibold fs-5 text-dark">{profile.age} years</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-5 d-flex gap-3">
                                        <button className="btn btn-primary px-4 py-2 fw-semibold shadow-sm" onClick={() => setIsEditing(true)}>
                                            Edit Profile
                                        </button>
                                        <button className="btn btn-outline-danger px-4 py-2 fw-semibold" onClick={() => {
                                            const role = localStorage.getItem("role");
                                            navigate(role === "ADMIN" ? "/admin/change-password" : "/employee/change-password");
                                        }}>
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <h4 className="fw-bold mb-4 text-secondary">Edit Profile</h4>
                                    
                                    <div className="row g-3">
                                        <div className="col-sm-12">
                                            <label className="form-label fw-semibold text-secondary">Full Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="name" 
                                                value={formData.name} 
                                                onChange={handleChange} 
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="col-sm-6">
                                            <label className="form-label fw-semibold text-secondary">Email Address</label>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                name="email" 
                                                value={formData.email} 
                                                onChange={handleChange} 
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="col-sm-6">
                                            <label className="form-label fw-semibold text-secondary">Phone Number</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="phone_no" 
                                                value={formData.phone_no} 
                                                onChange={handleChange} 
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="col-sm-6">
                                            <label className="form-label fw-semibold text-secondary">Age</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="age" 
                                                value={formData.age} 
                                                onChange={handleChange} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="mt-5 d-flex gap-2">
                                        <button type="submit" className="btn btn-success px-4 py-2 fw-semibold shadow-sm">
                                            Save Changes
                                        </button>
                                        <button type="button" className="btn btn-secondary px-4 py-2 fw-semibold" onClick={() => setIsEditing(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
