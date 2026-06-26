package com.example.demo.controller;

import com.example.demo.dto.LeaveDecsionRequest;
import com.example.demo.dto.LeaveRequest;
import com.example.demo.model.Leave;
import com.example.demo.model.employee;
import com.example.demo.repo.leaverepo;
import com.example.demo.repo.repo;
import com.example.demo.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@RestController
@CrossOrigin("*")

public class LeaveController {
    @Autowired
    repo r;
    @Autowired
    leaverepo leaverepo;
    @Autowired
    MailService mailService;

    @PostMapping("/employee/applyleave")
    public String  applyleave(@RequestBody LeaveRequest leaveRequest){
        Leave leave=new Leave();
        SecurityContext context= SecurityContextHolder.getContext();
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
        List<employee> admins = r.findByRole("ADMIN");

        for(employee admin : admins){

            mailService.sendMail(
                    admin.getEmail(),
                    "New Leave Request",
                    "Employee: "
                            + e.getName()
                            + "\nLeave Type: "
                            + leave.getLeavetype()
                            + "\nFrom: "
                            + leave.getFromdate()
                            + "\nTo: "
                            + leave.getTodate()
                            + "\nReason: "
                            + leave.getReason()
            );
        }
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
    @GetMapping("/admin/employee/{id}/leaves")
    public List<Leave> getEmployeeLeaves(@PathVariable Long id) {
        employee emp = r.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return leaverepo.findByEmployee(emp);
    }

    @DeleteMapping("/admin/leave/{id}")
    public org.springframework.http.ResponseEntity<?> deleteLeave(@PathVariable Long id) {
        Leave leave = leaverepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
        if ("PENDING".equals(leave.getStatus())) {
            return org.springframework.http.ResponseEntity.badRequest().body("Pending leave requests cannot be deleted.");
        }
        leaverepo.delete(leave);
        return org.springframework.http.ResponseEntity.ok("Leave request deleted successfully.");
    }
    @PutMapping("/admin/leave/{id}/approve")
    public String approve(@PathVariable Long id, @RequestBody LeaveDecsionRequest leavedescisionrequest){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication auth = context.getAuthentication();
        String username = auth.getName();
        employee e = r.findByUsername(username).get();
        Optional<Leave> leave=leaverepo.findById(id);
        Leave l=leave.get();
        l.setStatus("APPROVED");
        l.setAdmincomment(leavedescisionrequest.getComment());
        leaverepo.save(l);
        mailService.sendMail(l.getEmployee().getEmail(),
                "Leave Approved",
                "Your leave request has been approved.\n\n"
                        + "Comment: "
                        + l.getAdmincomment());
        return "Leave approved succesfully";

    }
    @PutMapping("/admin/leave/{id}/reject")
    public String reject(@PathVariable Long id, @RequestBody LeaveDecsionRequest leavedescisionrequest){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication auth = context.getAuthentication();
        String username = auth.getName();
        employee e = r.findByUsername(username).get();
        Optional<Leave>leave=leaverepo.findById(id);
        Leave l=leave.get();
        l.setStatus("REJECTED");
        l.setAdmincomment(leavedescisionrequest.getComment());
        leaverepo.save(l);
        mailService.sendMail(l.getEmployee().getEmail(),
                "Leave Rejected",
                "Your leave request has been rejected.\n\n"
                        + "Comment: "
                        + l.getAdmincomment());
        return "Leave rejected succesfully";

    }
}
