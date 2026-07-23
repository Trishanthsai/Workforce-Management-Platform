package com.example.demo.dto;

public class EmployeeDashboard {
    private String name;
    private String email;
    private String designation;
    private Long totaltask;
    private Long pendingtask;
    private Long completedtask;
    private Long inprogresstask;

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getTotaltask() {
        return totaltask;
    }

    public void setTotaltask(Long totaltask) {
        this.totaltask = totaltask;
    }

    public Long getPendingtask() {
        return pendingtask;
    }

    public void setPendingtask(Long pendingtask) {
        this.pendingtask = pendingtask;
    }

    public Long getCompletedtask() {
        return completedtask;
    }

    public void setCompletedtask(Long completedtask) {
        this.completedtask = completedtask;
    }

    public Long getInprogresstask() {
        return inprogresstask;
    }

    public void setInprogresstask(Long inprogresstask) {
        this.inprogresstask = inprogresstask;
    }
}
