package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.model.*;
import com.example.demo.repo.*;
import com.example.demo.service.Auditlogsservice;
import com.example.demo.service.MailService;
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

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")

public class EmployeeController {

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
    @Autowired
    Announcementrepo announcementrepo;
    @Autowired
    Loginlogrepo loginlogrepo;
    @Autowired
    MailService mailService;


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
    public ResponseEntity<employee> getemployee(@PathVariable Long id) {
        employee emp = service.getemployeeById(id);
        return ResponseEntity.ok(emp);
    }

    @PostMapping("/employee")
    public ResponseEntity<employee> addemployee(@Valid @RequestBody employee employee) {
        System.out.println("========== ADD EMPLOYEE CONTROLLER HIT ==========");
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        String user = authentication.getName();

        String rawPassword = employee.getPassword();
        employee.setPassword(passwordEncoder.encode(rawPassword));

        if (employee.getRole() == null || employee.getRole().trim().isEmpty()) {
            employee.setRole("EMPLOYEE");
        }

        employee saved = service.addemployee(employee);
        auditlogsservice.savelogs(user,"EMPLOYEE_CREATED");

        try {
            mailService.sendMail(
                    saved.getEmail(),
                    "Welcome to HRMS - Your Account Details",
                    "Hello " + saved.getName() + ",\n\n" +
                    "Welcome to the Workforce Management Platform (HRMS)!\n" +
                    "Your account has been successfully created by the Admin.\n\n" +
                    "Here are your login credentials to access the portal:\n" +
                    "Username: " + saved.getUsername() + "\n" +
                    "Password: " + rawPassword + " (Temporary)\n\n" +
                    "Please log in and update your details as needed.\n\n" +
                    "Best regards,\nHR Team"
            );
        } catch (Exception ex) {
            System.err.println("Failed to send welcome email: " + ex.getMessage());
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/employee/{id}")
    public ResponseEntity<employee> updateemployees(
            @PathVariable Long id,
            @RequestBody EmployeeUpdateRequest request
    ) {

        employee updated = service.updateemployees(id, request);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<String> deleteemployee(@PathVariable Long id) {
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
                        e.getPhone_no(),
                        e.getProfilePic()
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
        e.setProfilePic(employeeUpdateProfileResponse.getProfilePic());
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
            if (employeePasswordChangeRequest.getOldpassword().equals((employeePasswordChangeRequest.getNewPassword()))) {
                return "new password must be different from old password";
            } else {

                e.setPassword(passwordEncoder.encode(employeePasswordChangeRequest.getNewPassword()));
                r.save(e);
                auditlogsservice.savelogs(user, "PASSWORD_CHANGED");
                return "password changed successfully";
            }

        } else {
            return "Old password is incorrect";
        }
    }

}
