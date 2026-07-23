package com.example.demo.service;

import com.example.demo.model.Auditlogs;
import com.example.demo.model.employee;
import com.example.demo.repo.Auditlogsrepo;
import com.example.demo.repo.repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class Auditlogsservice {
    @Autowired
    private Auditlogsrepo auditlogsrepo;

    @Autowired
    private repo employeeRepo;

    public void savelogs(String username, String action) {
        if (username != null) {
            Optional<employee> empOpt = employeeRepo.findByUsername(username);
            if (empOpt.isPresent() && "ADMIN".equalsIgnoreCase(empOpt.get().getRole())) {
                return; // Do not log admin activities
            }
        }
        
        Auditlogs auditlogs = new Auditlogs();
        auditlogs.setUsername(username);
        auditlogs.setAction(action);
        auditlogs.setTimestamp(LocalDateTime.now());
        auditlogsrepo.save(auditlogs);
    }
}
