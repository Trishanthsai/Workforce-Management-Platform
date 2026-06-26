import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../Services/AuthService";
import Footer from "../components/Footer";
import { getEmployeeProfile } from "../Services/Employeeservice";

function AdminLayout() {
    const navigate = useNavigate();
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const username = localStorage.getItem("username") || "Admin";
    const [profilePic, setProfilePic] = useState("");

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [photoModalOpen, setPhotoModalOpen] = useState(false);
    const dropdownRef = useRef(null);
    const role = localStorage.getItem("role") || "ADMIN";

    useEffect(() => {
        getEmployeeProfile()
            .then((res) => {
                if (res.data && res.data.profilePic) {
                    setProfilePic(res.data.profilePic);
                }
            })
            .catch((err) => {
                console.error("Failed to load profile pic in layout:", err);
            });
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout(username)
            .finally(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("username");
                navigate("/");
            });
    };

    // Shared SVGs for Navigation
    const icons = {
        dashboard: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>,
        employees: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
        tasks: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>,
        leaves: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
        announcements: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
        audit: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
        loginLogs: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
        logout: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
    };

    const navLinks = [
        { to: "/admin-dashboard", label: "Dashboard", icon: icons.dashboard },
        { to: "/employees", label: "Employees", icon: icons.employees },
        { to: "/admin/tasks", label: "Task Management", icon: icons.tasks },
        { to: "/admin/leaves", label: "Leave Requests", icon: icons.leaves },
        { to: "/admin/announcements", label: "Announcements", icon: icons.announcements },
        { to: "/admin/audit-logs", label: "Audit Logs", icon: icons.audit },
        { to: "/admin/login-logs", label: "Login Logs", icon: icons.loginLogs },
    ];

    const MenuLinks = ({ clickHandler }) => (
        <>
            {navLinks.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={clickHandler}
                    className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                >
                    {link.icon}
                    <span>{link.label}</span>
                </NavLink>
            ))}
            <button
                onClick={() => {
                    if (clickHandler) clickHandler();
                    handleLogout();
                }}
                className="sidebar-link w-100 text-start border-0 bg-transparent mt-auto"
            >
                {icons.logout}
                <span>Logout</span>
            </button>
        </>
    );

    return (
        <div className="container-fluid p-0">
            <div className="d-flex min-vh-100 flex-column flex-md-row">
                
                {/* Desktop Sidebar */}
                <div className="col-md-3 col-lg-2 sidebar d-none d-md-flex p-0">
                    <div className="sidebar-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <span>HRMS Admin</span>
                    </div>
                    <div className="sidebar-menu">
                        <MenuLinks />
                    </div>
                    <div className="sidebar-footer text-muted small text-center py-2">
                        v1.0.0
                    </div>
                </div>

                {/* Mobile Navbar Header */}
                <div className="mobile-navbar w-100 d-flex d-md-none justify-content-between align-items-center">
                    <button 
                        className="btn btn-outline-secondary p-2 border-0" 
                        onClick={() => setMobileSidebarOpen(true)}
                        aria-label="Toggle Navigation"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                    </button>
                    <span className="fw-bold">HRMS Admin</span>
                    {profilePic ? (
                        <img 
                            src={profilePic} 
                            alt={username} 
                            className="rounded-circle shadow-sm" 
                            style={{ width: "35px", height: "35px", objectFit: "cover", cursor: "pointer" }} 
                            onClick={() => setPhotoModalOpen(true)}
                        />
                    ) : (
                        <div 
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" 
                            style={{ width: "35px", height: "35px", fontSize: "0.9rem", cursor: "pointer" }}
                            onClick={() => setPhotoModalOpen(true)}
                        >
                            {username.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Mobile Sidebar Drawer */}
                <div className={`drawer-overlay ${mobileSidebarOpen ? 'show' : ''}`} onClick={() => setMobileSidebarOpen(false)}></div>
                <div className={`mobile-sidebar-drawer ${mobileSidebarOpen ? 'open' : ''}`}>
                    <div className="sidebar-logo d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-white">HRMS Portal</span>
                        <button className="btn text-white p-0" onClick={() => setMobileSidebarOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>
                    <div className="sidebar-menu">
                        <MenuLinks clickHandler={() => setMobileSidebarOpen(false)} />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="col-12 col-md-9 col-lg-10 d-flex flex-column bg-light min-vh-100">
                    
                    {/* Desktop Content Header */}
                    <header className="d-none d-md-flex justify-content-between align-items-center bg-white px-4 py-3 border-bottom shadow-sm">
                        <h5 className="text-secondary mb-0 fw-semibold">Workspace Management</h5>
                        <div className="d-flex align-items-center gap-3 position-relative" ref={dropdownRef}>
                            <div 
                                className="d-flex align-items-center gap-2" 
                                style={{ cursor: "pointer" }} 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span className="text-muted small">Welcome back, <strong className="text-dark">{username}</strong></span>
                                {profilePic ? (
                                    <img 
                                        src={profilePic} 
                                        alt={username} 
                                        className="rounded-circle shadow-sm" 
                                        style={{ width: "40px", height: "40px", objectFit: "cover" }} 
                                    />
                                ) : (
                                    <div className="rounded-circle bg-indigo text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: "40px", height: "40px", backgroundColor: "#6366f1" }}>
                                        {username.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div 
                                    className="position-absolute end-0 bg-white border rounded shadow-lg p-2" 
                                    style={{ top: "50px", minWidth: "180px", zIndex: 1000 }}
                                >
                                    <button 
                                        className="btn btn-link text-decoration-none text-dark w-100 text-start py-2 px-3 hover-bg-light"
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            navigate(role === "ADMIN" ? "/admin/profile" : "/employee/profile");
                                        }}
                                        style={{ border: "none", background: "none", fontSize: "0.9rem" }}
                                    >
                                        View Profile
                                    </button>
                                    <button 
                                        className="btn btn-link text-decoration-none text-dark w-100 text-start py-2 px-3 hover-bg-light"
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            setPhotoModalOpen(true);
                                        }}
                                        style={{ border: "none", background: "none", fontSize: "0.9rem" }}
                                    >
                                        View Profile Photo
                                    </button>
                                    <hr className="my-1" />
                                    <button 
                                        className="btn btn-link text-decoration-none text-danger w-100 text-start py-2 px-3 hover-bg-light"
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            handleLogout();
                                        }}
                                        style={{ border: "none", background: "none", fontSize: "0.9rem" }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Content Body */}
                    <main className="flex-grow-1 p-3 p-md-4" style={{ overflowY: "auto" }}>
                        <Outlet />
                    </main>

                    {/* Footer */}
                    <Footer />
                </div>

            </div>

            {/* Profile Photo Modal */}
            {photoModalOpen && (
                <div 
                    className="modal fade show d-block" 
                    tabIndex="-1" 
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
                    onClick={() => setPhotoModalOpen(false)}
                >
                    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
                            <div className="modal-header border-0 bg-light py-3 px-4">
                                <h5 className="modal-title fw-bold text-dark">Profile Photo</h5>
                                <button type="button" className="btn-close" onClick={() => setPhotoModalOpen(false)}></button>
                            </div>
                            <div className="modal-body text-center p-4 bg-white">
                                {profilePic ? (
                                    <img 
                                        src={profilePic} 
                                        alt="Profile Preview" 
                                        className="img-fluid rounded-4 shadow-sm"
                                        style={{ maxHeight: "400px", objectFit: "contain", width: "100%" }}
                                    />
                                ) : (
                                    <div 
                                        className="rounded-circle bg-indigo text-white d-flex align-items-center justify-content-center fw-bold mx-auto shadow-sm" 
                                        style={{ width: "150px", height: "150px", fontSize: "4rem", backgroundColor: "#6366f1" }}
                                    >
                                        {username.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminLayout;