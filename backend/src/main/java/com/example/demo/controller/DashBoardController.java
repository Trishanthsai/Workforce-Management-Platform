package com.example.demo.controller;

import com.example.demo.dto.AdminDashboard;
import com.example.demo.dto.EmployeeDashboard;
import com.example.demo.model.Task;
import com.example.demo.model.TaskStatus;
import com.example.demo.model.employee;
import com.example.demo.repo.Announcementrepo;
import com.example.demo.repo.Taskrepo;
import com.example.demo.repo.repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@CrossOrigin("*")
public class DashBoardController {
    @Autowired
    Taskrepo taskrepo;
    @Autowired
    repo r;
    @Autowired
    Announcementrepo announcementrepo;
    @GetMapping("/admin/dashboard")
    public AdminDashboard getAdminDashboard() {

        AdminDashboard adminDashboard = new AdminDashboard();

        adminDashboard.setTotalemployees(r.count());
        adminDashboard.setTotaltasks(taskrepo.count());
        adminDashboard.setPendingtasks(
                taskrepo.countBystatus(TaskStatus.PENDING)
        );

        adminDashboard.setCompletedtasks(
                taskrepo.countBystatus(TaskStatus.COMPLETED)
        );

        adminDashboard.setInprogresstask(
                taskrepo.countBystatus(TaskStatus.IN_PROGRESS)
        );
        adminDashboard.setAnnouncement(announcementrepo.count());
        return adminDashboard;
    }
    @GetMapping("/employee/dashboard")
    public EmployeeDashboard getdetails(){
        EmployeeDashboard employeeDashboard=new EmployeeDashboard();
        SecurityContext context= SecurityContextHolder.getContext();
        Authentication auth= context.getAuthentication();
        String user= auth.getName();
        employee e=r.findByUsername(user).get();
        List<Task> tasks = taskrepo.findByemployee(e);
        employeeDashboard.setName(e.getName());
        employeeDashboard.setEmail(e.getEmail());
        employeeDashboard.setDesignation(e.getDesignation());
        employeeDashboard.setTotaltask((long) tasks.size());
        long pending = tasks.stream()
                .filter(t -> t.getStatus() == TaskStatus.PENDING)
                .count();

        long completed = tasks.stream()
                .filter(t -> t.getStatus() == TaskStatus.COMPLETED)
                .count();

        long inProgress = tasks.stream()
                .filter(t -> t.getStatus() == TaskStatus.IN_PROGRESS)
                .count();
        employeeDashboard.setPendingtask(pending);
        employeeDashboard.setCompletedtask(completed);
        employeeDashboard.setInprogresstask(inProgress);

        return employeeDashboard;
    }
}
