package com.example.demo.controller;

import com.example.demo.model.Auditlogs;
import com.example.demo.repo.Auditlogsrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@CrossOrigin("*")

public class AuditLogController {
    @Autowired
    Auditlogsrepo auditlogsrepo;
    @GetMapping("/admin/auditlogs")
    public List<Auditlogs> auditlogsrepo() {
        return auditlogsrepo.findAll();
    }

}
