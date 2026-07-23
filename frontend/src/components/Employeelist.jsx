import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, deleteEmployee as deleteEmployeeService } from "../Services/Employeeservice";

const Employeelist = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [loading, setLoading] = useState(true);

  const navigator = useNavigate();

  useEffect(() => {
    getEmployees()
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  function addnewemployee() {
    navigator('/add-employee');
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function viewEmployee(id) {
    navigator(`/admin/employee-details/${id}`);
  }

  const deleteEmployee = (id) => {
    if (!window.confirm("Delete this employee?")) return;

    deleteEmployeeService(id)
      .then(() => {
        setEmployees(prev => prev.filter(emp => emp.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortField(field);
    setSortDirection(isAsc ? "desc" : "asc");
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return "↕";
    return sortDirection === "asc" ? "▲" : "▼";
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();
    return (
      (emp.name && emp.name.toLowerCase().includes(term)) ||
      (emp.email && emp.email.toLowerCase().includes(term)) ||
      (emp.designation && emp.designation.toLowerCase().includes(term))
    );
  });

  // Sort filtered employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Paginate sorted employees
  const indexOfLastEmployee = currentPage * pageSize;
  const indexOfFirstEmployee = indexOfLastEmployee - pageSize;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(sortedEmployees.length / pageSize);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

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
    <div className="container-fluid py-2">
      
      {/* Title & Action Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-3">
          <button className="back-btn-link bg-transparent border-0" onClick={() => navigator('/admin-dashboard')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            <span>Dashboard</span>
          </button>
          <h3 className="mb-0 fw-bold text-dark">Employee Management</h3>
        </div>
        <button className="btn btn-primary fw-semibold px-4 py-2 shadow-sm d-flex align-items-center gap-2" onClick={addnewemployee}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          <span>Add Employee</span>
        </button>
      </div>

      <div className="card shadow-premium border-0 rounded-4">
        <div className="card-body p-4">
          
          {/* Filters Bar */}
          <div className="row g-3 mb-4 align-items-center">
            <div className="col-md-6 col-lg-4">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search by name, email, designation..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to page 1 on search
                  }}
                />
              </div>
            </div>
            
            <div className="col-md-3 col-lg-2 ms-auto">
              <div className="d-flex align-items-center gap-2 justify-content-end">
                <span className="text-nowrap text-muted small fw-medium">Show:</span>
                <select
                  className="form-select form-select-sm border-0 bg-light fw-semibold"
                  style={{ width: "80px" }}
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1); // Reset to page 1
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="table-container d-none d-md-block">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th onClick={() => handleSort("id")} style={{ cursor: "pointer", width: "80px" }}>ID {getSortIcon("id")}</th>
                  <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>Name {getSortIcon("name")}</th>
                  <th onClick={() => handleSort("age")} style={{ cursor: "pointer" }}>Age {getSortIcon("age")}</th>
                  <th onClick={() => handleSort("salary")} style={{ cursor: "pointer" }}>Salary {getSortIcon("salary")}</th>
                  <th onClick={() => handleSort("designation")} style={{ cursor: "pointer" }}>Designation {getSortIcon("designation")}</th>
                  <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>Email {getSortIcon("email")}</th>
                  <th>Phone</th>
                  <th className="text-center" style={{ width: "200px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-5">
                      No Employees Found
                    </td>
                  </tr>
                ) : (
                  currentEmployees.map(emp => (
                    <tr key={emp.id}>
                      <td className="fw-semibold text-secondary">#{emp.id}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}>
                            {emp.name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="fw-bold text-dark">{emp.name}</span>
                        </div>
                      </td>
                      <td>{emp.age}</td>
                      <td className="text-success fw-bold">₹{emp.salary?.toLocaleString()}</td>
                      <td>
                        <span className="badge bg-light text-dark border px-2 py-1 fw-semibold">{emp.designation}</span>
                      </td>
                      <td className="text-muted">{emp.email}</td>
                      <td>{emp.phone_no || "N/A"}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button className="btn btn-outline-primary btn-sm fw-semibold" onClick={() => viewEmployee(emp.id)}>
                            View
                          </button>
                          <button className="btn btn-outline-secondary btn-sm fw-semibold" onClick={() => updateEmployee(emp.id)}>
                            Edit
                          </button>
                          <button className="btn btn-outline-danger btn-sm fw-semibold" onClick={() => deleteEmployee(emp.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Grid View */}
          <div className="d-block d-md-none">
            {currentEmployees.length === 0 ? (
              <div className="text-center text-muted py-5">
                No Employees Found
              </div>
            ) : (
              <div className="row g-3">
                {currentEmployees.map(emp => (
                  <div key={emp.id} className="col-12">
                    <div className="card shadow-sm border rounded-4 p-3 bg-white">
                      
                      {/* Avatar & Title Row */}
                      <div className="d-flex align-items-center gap-3 mb-3 border-bottom pb-2">
                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: "45px", height: "45px", fontSize: "1.1rem" }}>
                          {emp.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h5 className="mb-0 fw-bold text-dark">{emp.name}</h5>
                          <span className="badge bg-light text-dark border small mt-1">{emp.designation}</span>
                        </div>
                        <span className="ms-auto fw-bold text-secondary">#{emp.id}</span>
                      </div>

                      {/* Detail fields */}
                      <div className="row g-2 mb-3 small text-secondary">
                        <div className="col-6">
                          <small className="text-muted d-block">Age</small>
                          <span className="fw-semibold text-dark">{emp.age} years</span>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Salary</small>
                          <span className="fw-bold text-success">₹{emp.salary?.toLocaleString()}</span>
                        </div>
                        <div className="col-12">
                          <small className="text-muted d-block">Email</small>
                          <span className="fw-semibold text-dark text-break">{emp.email}</span>
                        </div>
                        <div className="col-12">
                          <small className="text-muted d-block">Phone</small>
                          <span className="fw-semibold text-dark">{emp.phone_no || "N/A"}</span>
                        </div>
                      </div>

                      {/* Mobile action actions */}
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary btn-sm fw-semibold flex-grow-1 py-2" onClick={() => viewEmployee(emp.id)}>
                          View
                        </button>
                        <button className="btn btn-outline-secondary btn-sm fw-semibold flex-grow-1 py-2" onClick={() => updateEmployee(emp.id)}>
                          Edit
                        </button>
                        <button className="btn btn-outline-danger btn-sm fw-semibold flex-grow-1 py-2" onClick={() => deleteEmployee(emp.id)}>
                          Delete
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 gap-3">
              <span className="text-muted small fw-medium">
                Showing {indexOfFirstEmployee + 1} to {Math.min(indexOfLastEmployee, sortedEmployees.length)} of {sortedEmployees.length} employees
              </span>
              <nav aria-label="Page navigation">
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Employeelist;