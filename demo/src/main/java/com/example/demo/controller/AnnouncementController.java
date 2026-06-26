package com.example.demo.controller;

import com.example.demo.dto.announcement;
import com.example.demo.model.Announcement;
import com.example.demo.model.employee;
import com.example.demo.repo.Announcementrepo;
import com.example.demo.repo.repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.MailService;


import java.time.LocalDateTime;
import java.util.List;
@RestController
@CrossOrigin("*")

public class AnnouncementController {
    @Autowired
    Announcementrepo announcementrepo;
    @Autowired
    repo r;
    @Autowired
    MailService mailService;
    @PostMapping("/admin/announcement")
    public String makeannouncement(@RequestBody announcement announcement){
        Announcement announcement1=new Announcement();
        SecurityContext context= SecurityContextHolder.getContext();
        Authentication auth= context.getAuthentication();
        String user= auth.getName();
        employee e=r.findByUsername(user).get();
        announcement1.setTitle(announcement.getTitle());
        announcement1.setMessage(announcement.getMessage());
        announcement1.setCreatedat(LocalDateTime.now());
        announcement1.setCreatedBy(user);
        announcementrepo.save(announcement1);
        List<employee> employees = r.findAll();

        for(employee emp : employees){

            mailService.sendMail(
                    emp.getEmail(),
                    "Announcement : " + announcement1.getTitle(),
                    "Hello " + emp.getName()
                            + "\n\nNew Announcement"
                            + "\n\nTitle: " + announcement1.getTitle()
                            + "\nMessage: " + announcement1.getMessage()
                            + "\n\nRegards,\nHRMS Team"
            );
        }
        return "Announcement is made succesfully";
    }
    @GetMapping("/announcements")
    public List<Announcement> getAnnouncements(){
        List<Announcement>listofannouncement=announcementrepo.findAll();
        return listofannouncement;

    }
    @DeleteMapping("/admin/announcement/{id}")
    public String deleteAnnouncement(@PathVariable Long id) {

        announcementrepo.deleteById(id);

        return "Announcement deleted successfully";
    }
    @PutMapping("/admin/announcement/{id}")
    public String updateAnnouncement(
            @PathVariable Long id,
            @RequestBody announcement announcement) {

        Announcement a = announcementrepo.findById(id).orElseThrow();

        a.setTitle(announcement.getTitle());
        a.setMessage(announcement.getMessage());

        announcementrepo.save(a);

        return "Announcement updated successfully";
    }
}
