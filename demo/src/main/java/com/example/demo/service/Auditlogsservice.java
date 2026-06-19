package com.example.demo.service;

import com.example.demo.model.Auditlogs;
import com.example.demo.repo.Auditlogsrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class Auditlogsservice {
    @Autowired
    private Auditlogsrepo auditlogsrepo;
    public  void savelogs(String username,String action){
        Auditlogs auditlogs = new Auditlogs();
        auditlogs.setUsername(username);
        auditlogs.setAction(action);
        auditlogs.setTimestamp(LocalDateTime.now());
        auditlogsrepo.save(auditlogs);
    }
}
