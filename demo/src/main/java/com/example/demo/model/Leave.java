package com.example.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Entity
public class Leave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private employee employee;
    private String leavetype;
    private String reason;
    private LocalDate fromdate;
    private LocalDate todate;
    private String status;
    private LocalDateTime appliedat;
    private String admincomment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public employee getEmployee() {
        return employee;
    }

    public void setEmployee(employee employee) {
        this.employee = employee;
    }

    public String getLeavetype() {
        return leavetype;
    }

    public void setLeavetype(String leavetype) {
        this.leavetype = leavetype;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDate getFromdate() {
        return fromdate;
    }

    public void setFromdate(LocalDate fromdate) {
        this.fromdate = fromdate;
    }

    public LocalDate getTodate() {
        return todate;
    }

    public void setTodate(LocalDate todate) {
        this.todate = todate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getAppliedat() {
        return appliedat;
    }

    public void setAppliedat(LocalDateTime appliedat) {
        this.appliedat = appliedat;
    }

    public String getAdmincomment() {
        return admincomment;
    }

    public void setAdmincomment(String admincomment) {
        this.admincomment = admincomment;
    }
}
