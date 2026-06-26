package com.example.demo.controller;

import com.example.demo.dto.TaskUpdate;
import com.example.demo.dto.Taskassignment;
import com.example.demo.model.Task;
import com.example.demo.model.TaskStatus;
import com.example.demo.model.employee;
import com.example.demo.repo.Auditlogsrepo;
import com.example.demo.repo.Taskrepo;
import com.example.demo.repo.repo;
import com.example.demo.service.Auditlogsservice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.MailService;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@RestController
@CrossOrigin("*")
public class TaskController {
    @Autowired
    Taskrepo taskrepo;
    @Autowired
    repo r;
    @Autowired
    Auditlogsservice auditlogsservice;
    @Autowired
    Auditlogsrepo auditlogsrepo;
    @Autowired
    MailService mailService;
    @PostMapping("/admin/task")
    public String  addtask(@Valid @RequestBody Taskassignment taskassignment) {
        Optional<employee> emp=r.findById(taskassignment.getEmployeeid());
        employee e = emp.get();
        Task task = new Task();
        task.setTitle(taskassignment.getTitle());
        task.setDescription(taskassignment.getDescription());
        task.setPriority(taskassignment.getPriority());
        task.setEmployee(e);
        task.setCreatedAt(LocalDateTime.now());
        task.setStatus(TaskStatus.PENDING);
        task.setDeadline(taskassignment.getDeadline());
        taskrepo.save(task);
        auditlogsservice.savelogs(e.getUsername(),"TASK_ASSIGNED");
        mailService.sendMail(
                task.getEmployee().getEmail(),
                "New Task Assigned",
                "Hello " + e.getName() +
                        "\n\nA new task has been assigned to you." +
                        "\n\nTitle: " + task.getTitle() +
                        "\nDescription: " + task.getDescription() +
                        "\nPriority: " + task.getPriority() +
                        "\nStatus: " + task.getStatus()+
                        "\nAssigned At: " + task.getCreatedAt()
        );
        return "Task assigned successfully";
    }
    @GetMapping("/employee/task")
    public List<Task> getmytask(){
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
    public String Taskupdate(
            @RequestBody TaskUpdate taskUpdate,
            @PathVariable Long id) {

        Task task = taskrepo.findById(id).orElseThrow();

        String status = taskUpdate.getStatus();

        if ("IN_PROGRESS".equals(status)) {

            task.setStatus(TaskStatus.IN_PROGRESS);

            auditlogsservice.savelogs(
                    task.getEmployee().getUsername(),
                    "TASK_STARTED"
            );
        }

        else if ("COMPLETION_REQUESTED".equals(status)) {

            task.setStatus(TaskStatus.COMPLETION_REQUESTED);

            List<employee> admins = r.findByRole("ADMIN");

            for (employee admin : admins) {

                mailService.sendMail(
                        admin.getEmail(),
                        "Task Completion Request",
                        task.getEmployee().getName()
                                + " has requested completion approval.\n\nTask : "
                                + task.getTitle()
                );
            }

            auditlogsservice.savelogs(
                    task.getEmployee().getUsername(),
                    "TASK_COMPLETION_REQUESTED"
            );
        }

        taskrepo.save(task);

        return "Task Updated Successfully";
    }
    @PutMapping("/admin/task/{id}/reassign/{taskid}")
    public String Reassign(@PathVariable Long id,@PathVariable Long taskid) {
        Optional<Task> task=taskrepo.findById(taskid);
        Task t=task.get();
        Optional<employee>emp=r.findById(id);
        employee e = emp.get();
        t.setEmployee(e);
        taskrepo.save(t);
        mailService.sendMail(
                e.getEmail(),
                "Task Reassigned",
                "A task has been assigned to you.\n\nTitle: "
                        + t.getTitle()
        );
        return"Successfully reassigned";
    }
    @PutMapping("/admin/task/{id}/approve")
    public String approveTask(@PathVariable Long id) {

        Task task = taskrepo.findById(id).orElseThrow();

        task.setStatus(TaskStatus.COMPLETED);
        taskrepo.save(task);

        auditlogsservice.savelogs(
                task.getEmployee().getUsername(),
                "TASK_APPROVED"
        );

        mailService.sendMail(
                task.getEmployee().getEmail(),
                "Task Approved",
                "Congratulations!\n\n"
                        + "Your task '"
                        + task.getTitle()
                        + "' has been approved by Admin."
        );

        return "Task Approved Successfully";
    }
    @PutMapping("/admin/task/{id}/reject")
    public String rejectTask(@PathVariable Long id) {

        Task task = taskrepo.findById(id).orElseThrow();

        task.setStatus(TaskStatus.IN_PROGRESS);
        taskrepo.save(task);

        auditlogsservice.savelogs(
                task.getEmployee().getUsername(),
                "TASK_REJECTED"
        );

        mailService.sendMail(
                task.getEmployee().getEmail(),
                "Task Rejected",
                "Your completion request for task '"
                        + task.getTitle()
                        + "' has been rejected."
                        + "\nPlease make the required changes and submit again."
        );

        return "Task Rejected";
    }
    @DeleteMapping("/admin/task/{id}")
    public String delettask(@PathVariable Long id){
        Task task=taskrepo.findById(id).orElseThrow();
        auditlogsservice.savelogs(task.getEmployee().getUsername(),"TASK_DELETED");
        taskrepo.delete(task);
        return"Task deleted Succesfully";
    }
    @GetMapping("/admin/employee/{id}/tasks")
    public List<Task> getEmployeeTasks(@PathVariable Long id) {

        employee emp = r.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        return taskrepo.findByemployee(emp);
    }
}
