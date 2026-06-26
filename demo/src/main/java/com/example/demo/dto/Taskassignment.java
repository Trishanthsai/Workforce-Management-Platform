package com.example.demo.dto;

import java.time.LocalDateTime;
import java.time.LocalDate;

public class Taskassignment {
    private String title;
    private String description;
    private String status;
    private String priority;
    private Long employeeid;
    private String employee;
    private LocalDateTime created_at;
    private LocalDate deadline;

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public String getEmployee() {
        return employee;
    }

    public void setEmployee(String employee) {
        this.employee = employee;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Long getEmployeeid() {
        return employeeid;
    }

    public void setEmployeeid(Long employeeid) {
        this.employeeid = employeeid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }
}
