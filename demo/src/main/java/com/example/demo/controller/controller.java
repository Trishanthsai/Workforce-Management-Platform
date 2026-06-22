package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.model.Auditlogs;
import com.example.demo.model.Leave;
import com.example.demo.model.Task;
import com.example.demo.model.employee;
import com.example.demo.repo.Auditlogsrepo;
import com.example.demo.repo.Taskrepo;
import com.example.demo.repo.leaverepo;
import com.example.demo.repo.repo;
import com.example.demo.service.Auditlogsservice;
import com.example.demo.service.service;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
public class controller {

    @Autowired
    service service;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    repo r;
    @Autowired
    Auditlogsservice auditlogsservice;
    @Autowired
    Auditlogsrepo auditlogsrepo;
    @Autowired
    Taskrepo taskrepo;
    @Autowired
    leaverepo leaverepo;


    @GetMapping("/employee")
    public ResponseEntity<List<employee>> getemployees() {
        List<employee> list = service.getemployees();
        return ResponseEntity.ok(list);
    }


    @GetMapping("/employee/page")
    public ResponseEntity<Page<employee>> getemployeesPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        Page<employee> result = service.getemployeesPage(page, size, sortBy, direction);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<employee> getemployee(@PathVariable Integer id) {
        employee emp = service.getemployeeById(id);
        return ResponseEntity.ok(emp);
    }

    @PostMapping("/employee")
    public ResponseEntity<employee> addemployee(@Valid @RequestBody employee employee) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        String user = authentication.getName();
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employee saved = service.addemployee(employee);
        auditlogsservice.savelogs(user,"EMPLOYEE_CREATED");
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/employee/{id}")
    public ResponseEntity<employee> updateemployees(@PathVariable Integer id, @Valid @RequestBody employee employee) {
        employee updated = service.updateemployees(id, employee);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<String> deleteemployee(@PathVariable Integer id) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        String user = authentication.getName();
        service.deleteemployee(id);
        auditlogsservice.savelogs(user,"EMPLOYEE_DELETED");
        return ResponseEntity.ok("employee deleted");
    }

    @GetMapping("/employee/profile")
    public EmployeeProfileResponse getemployeeprofile() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        String user = authentication.getName();
        Optional<employee> emp = r.findByUsername(user);
        employee e = emp.get();
        EmployeeProfileResponse dto =
                new EmployeeProfileResponse(
                        e.getName(),
                        e.getId(),
                        e.getUsername(),
                        e.getAge(),
                        e.getDesignation(),
                        e.getEmail(),
                        e.getPhone_no()
                );
        return dto;
    }

    @PutMapping("/employee/profile")
    public EmployeeUpdateProfileRequest updateemployeeprofile(@RequestBody EmployeeUpdateProfileRequest employeeUpdateProfileResponse) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        String user = authentication.getName();
        Optional<employee> emp = r.findByUsername(user);
        employee e = emp.get();
        e.setName(employeeUpdateProfileResponse.getName());
        e.setEmail(employeeUpdateProfileResponse.getEmail());
        e.setPhone_no(employeeUpdateProfileResponse.getPhone_no());
        e.setAge(employeeUpdateProfileResponse.getAge());
        r.save(e);
        auditlogsservice.savelogs(user,"PROFILE_UPDATED");
        return employeeUpdateProfileResponse;

    }
    @PutMapping("/employee/changepassword")
    public String changepassword(@RequestBody EmployeePasswordChangeRequest employeePasswordChangeRequest) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        String user = authentication.getName();
        Optional<employee> emp = r.findByUsername(user);
        employee e = emp.get();
        if (passwordEncoder.matches(employeePasswordChangeRequest.getOldpassword(), e.getPassword())) {
            if(employeePasswordChangeRequest.getOldpassword().equals((employeePasswordChangeRequest.getNewPassword()))) {
                return "new password must be different from old password";
            }
            else{

                e.setPassword(passwordEncoder.encode(employeePasswordChangeRequest.getNewPassword()));
                r.save(e);
                auditlogsservice.savelogs(user,"PASSWORD_CHANGED");
                return "password changed successfully";
            }

        }
        else{
            return "Old password is incorrect";
        }

    }
    @GetMapping("/admin/auditlogs")
    public List<Auditlogs> auditlogsrepo() {
        return auditlogsrepo.findAll();
    }

    @PostMapping("/admin/task")
    public String  addtask(@Valid @RequestBody Taskassignment taskassignment) {
        Optional<employee>emp=r.findById(taskassignment.getEmployeeid());
        employee e = emp.get();
        Task task = new Task();
        task.setTitle(taskassignment.getTitle());
        task.setDescription(taskassignment.getDescription());
        task.setStatus(taskassignment.getStatus());
        task.setPriority(taskassignment.getPriority());
        task.setEmployee(e);
        task.setCreatedAt(LocalDateTime.now());
        taskrepo.save(task);
        auditlogsservice.savelogs(e.getUsername(),"TASK_ASSIGNED");

        return "Task assigned successfully";
    }
    @GetMapping("/employee/task")
    public List<Task>getmytask(){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        String user = authentication.getName();
        Optional<employee> emp = r.findByUsername(user);
        employee e = emp.get();
        return taskrepo.findByemployee(e);
    }
    @GetMapping("/admin/task")
    public List<Task>getalltask(){
        return taskrepo.findAll();
    }
    @PutMapping("/employee/task/{id}/status")
    public String Taskupdate(@RequestBody TaskUpdate taskUpdate, @PathVariable Integer id) {
        Optional<Task> task=taskrepo.findById(id);
        Task t=task.get();
        t.setStatus(taskUpdate.getStatus());
        taskrepo.save(t);
        return "success";


    }
    @PutMapping("/admin/task/{id}/reassign/{taskid}")
    public String Reassign(@PathVariable Integer id,@PathVariable Integer taskid) {
        Optional<Task> task=taskrepo.findById(taskid);
        Task t=task.get();
        Optional<employee>emp=r.findById(id);
        employee e = emp.get();
        t.setEmployee(e);
        taskrepo.save(t);
        return"Successfully reassigned";
    }
    @GetMapping("/admin/dashboard")
    public AdminDashboard getAdminDashboard() {

        AdminDashboard adminDashboard = new AdminDashboard();

        adminDashboard.setTotalemployees(r.count());
        adminDashboard.setTotaltasks(taskrepo.count());
        adminDashboard.setPendingtasks(taskrepo.countBystatus("PENDING"));
        adminDashboard.setCompletedtasks(taskrepo.countBystatus("COMPLETED"));
        adminDashboard.setInprogresstask(taskrepo.countBystatus("IN_PROGRESS"));

        return adminDashboard;
    }
    @GetMapping("/employee/dashboard")
    public EmployeeDashboard getdetails(){
        EmployeeDashboard employeeDashboard=new EmployeeDashboard();
        SecurityContext context=SecurityContextHolder.getContext();
        Authentication auth= context.getAuthentication();
        String user= auth.getName();
        employee e=r.findByUsername(user).get();
        List<Task> tasks = taskrepo.findByemployee(e);
        employeeDashboard.setName(e.getName());
        employeeDashboard.setEmail(e.getEmail());
        employeeDashboard.setDesignation(e.getDesignation());
        employeeDashboard.setTotaltask((long) tasks.size());
        long pending = tasks.stream().filter(t -> "PENDING".equals(t.getStatus())).count();
        long completed = tasks.stream().filter(t -> "COMPLETED".equals(t.getStatus())).count();
        long inProgress = tasks.stream().filter(t -> "IN_PROGRESS".equals(t.getStatus())).count();
        employeeDashboard.setPendingtask(pending);
        employeeDashboard.setCompletedtask(completed);
        employeeDashboard.setInprogresstask(inProgress);

        return employeeDashboard;
    }
    @PostMapping("/employee/applyleave")
    public String  applyleave(@RequestBody LeaveRequest leaveRequest){
        Leave leave=new Leave();
        SecurityContext context=SecurityContextHolder.getContext();
        Authentication auth= context.getAuthentication();
        String user= auth.getName();
        employee e=r.findByUsername(user).get();
        leave.setFromdate(leaveRequest.getFromdate());
        leave.setTodate(leaveRequest.getTodate());
        leave.setLeavetype(leaveRequest.getLeavetype());
        leave.setReason(leaveRequest.getReason());
        leave.setEmployee(e);
        leave.setStatus("PENDING");
        leave.setAppliedat(LocalDateTime.now());
        leave.setAdmincomment(null);
        leaverepo.save(leave);
        return "Leave applied succesfully";
    }
    @GetMapping("/employee/leave")
    public List<Leave> getleavedetails(){
        SecurityContext context=SecurityContextHolder.getContext();
        Authentication auth=context.getAuthentication();
        String user=auth.getName();
        employee e=r.findByUsername(user).get();
        List<Leave>leaves=leaverepo.findByEmployee(e);
        return leaves;

    }
    @GetMapping("/admin/leaves")
    public List<Leave>getallleavedetails(){
        List<Leave>leaves= leaverepo.findAll();
        return leaves;
    }
    @PutMapping("/admin/leave/{id}/approve")
    public String approve(@PathVariable Long  id){
        Optional<Leave> leave=leaverepo.findById(id);
        Leave l=leave.get();
        l.setStatus("APPROVED");
        leaverepo.save(l);
        return "LEAVE APPROVED";

    }
    @PutMapping("/admin/leave/{id}/reject")
    public String reject(@PathVariable Long  id){
        Optional<Leave> leave=leaverepo.findById(id);
        Leave l=leave.get();
        l.setStatus("REJECTED");
        leaverepo.save(l);
        return "LEAVE REJECTED";

    }


}
