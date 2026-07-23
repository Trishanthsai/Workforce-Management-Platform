package com.example.demo.controller;

import com.example.demo.model.Loginlog;
import com.example.demo.model.employee;
import com.example.demo.repo.Loginlogrepo;
import com.example.demo.repo.repo;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
@RestController
@CrossOrigin("*")
public class LoginlogsController {
    @Autowired
    Loginlogrepo loginlogrepo;
    @Autowired
    repo r;
    @GetMapping("/admin/loginlogs")
    public List<Loginlog> getAllLoginLogs() {
        return loginlogrepo.findAll();
    }
    @PostMapping("/logout")
    public String logout() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication auth = context.getAuthentication();
        String username = auth.getName();
        employee e = r.findByUsername(username).get();
        Loginlog log = loginlogrepo.findTopByEmployeeAndLogoutTimeIsNullOrderByLoginTimeDesc(e);
        if (log != null) {
            log.setLogoutTime(LocalDateTime.now());
            loginlogrepo.save(log);
        }

        return "Logged out successfully";
    }
}
