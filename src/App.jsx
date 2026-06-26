import Employeelist from "./Components/Employeelist";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Employeecomponent } from "./components/Employeecomponent";
import UpdateEmployeeComponent from "./components/UpdateEmployeeComponent";

import LoginPage from "./pages/LoginPage";

import AdminDashboard from "./pages/AdminDashboard";
import TaskManagement from "./pages/TaskManagement";
import LeaveManagement from "./pages/LeaveManagement";
import AnnouncementPage from "./pages/AnnouncementPage";
import AuditLogs from "./pages/AuditLogs";
import LoginLogs from "./pages/LoginLogs";

import EmployeeDashboard from "./pages/EmployeeDashboard";
import MyTasks from "./pages/MyTasks";
import ApplyLeave from "./pages/ApplyLeave";
import MyLeaves from "./pages/MyLeaves";
import EmployeeAnnouncements from "./pages/EmployeeAnnouncements";

import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import EmployeeDetails from "./pages/EmployeeDetails";
import ProfilePage from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePassword";
import EmployeeTasks from "./pages/EmployeeTasks";
import EmployeeLeaves from "./pages/EmployeeLeaves";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Employee Layout */}
        <Route element={<ProtectedRoute allowedRoles={["EMPLOYEE"]}><EmployeeLayout /></ProtectedRoute>}>

          <Route
            path="/employee-dashboard"
            element={<EmployeeDashboard />}
          />

          <Route
            path="/employee/my-tasks"
            element={<MyTasks />}
          />

          <Route
            path="/employee/apply-leave"
            element={<ApplyLeave />}
          />

          <Route
            path="/employee/my-leaves"
            element={<MyLeaves />}
          />

          <Route
            path="/employee/announcements"
            element={<EmployeeAnnouncements />}
          />
          <Route
 path="/employee/profile"
 element={<ProfilePage />}
/><Route
    path="/employee/change-password"
    element={<ChangePassword />}
/>

        </Route>

        {/* Admin Layout */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminLayout /></ProtectedRoute>}>

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />
          <Route path="/employees" element={<Employeelist />} />
          <Route path="/add-employee" element={<Employeecomponent />} />
          <Route
            path="/edit-employee/:id"
            element={<UpdateEmployeeComponent />}
          />
         <Route
 path="/admin/employee-details/:id"
 element={<EmployeeDetails />}
/>

          <Route
            path="/admin/tasks"
            element={<TaskManagement />}
          />
          <Route
    path="/admin/employee/:id/tasks"
    element={<EmployeeTasks />}
/>
          <Route
    path="/admin/employee/:id/leaves"
    element={<EmployeeLeaves />}
/>

          <Route
            path="/admin/leaves"
            element={<LeaveManagement />}
          />

          <Route
            path="/admin/announcements"
            element={<AnnouncementPage />}
          />

          <Route
            path="/admin/audit-logs"
            element={<AuditLogs />}
          />

          <Route
            path="/admin/login-logs"
            element={<LoginLogs />}
          />

          <Route
            path="/admin/profile"
            element={<ProfilePage />}
          />

          <Route
            path="/admin/change-password"
            element={<ChangePassword />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;