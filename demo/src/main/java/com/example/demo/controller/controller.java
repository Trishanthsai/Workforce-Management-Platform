package com.example.demo.controller;

import com.example.demo.dto.EmployeePasswordChangeRequest;
import com.example.demo.dto.EmployeeProfileResponse;
import com.example.demo.dto.EmployeeUpdateProfileRequest;
import com.example.demo.model.employee;
import com.example.demo.repo.repo;
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

@CrossOrigin("*")
@RestController
public class controller {

    @Autowired
    service service;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    repo r;


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
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employee saved = service.addemployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/employee/{id}")
    public ResponseEntity<employee> updateemployees(@PathVariable Integer id, @Valid @RequestBody employee employee) {
        employee updated = service.updateemployees(id, employee);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<String> deleteemployee(@PathVariable Integer id) {
        service.deleteemployee(id);
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
                return "password changed successfully";
            }

        }
        else{
            return "Old password is incorrect";
        }

    }





}
