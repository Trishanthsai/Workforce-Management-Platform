package com.example.demo.dto;

public class AdminDashboard {
    private long totalemployees;
    private long totaltasks;
    private long pendingtasks;
    private long completedtasks;
    private long inprogresstask;

    public long getTotalemployees() {
        return totalemployees;
    }

    public void setTotalemployees(long totalemployees) {
        this.totalemployees = totalemployees;
    }

    public long getTotaltasks() {
        return totaltasks;
    }

    public void setTotaltasks(long totaltasks) {
        this.totaltasks = totaltasks;
    }

    public long getPendingtasks() {
        return pendingtasks;
    }

    public void setPendingtasks(long pendingtasks) {
        this.pendingtasks = pendingtasks;
    }

    public long getCompletedtasks() {
        return completedtasks;
    }

    public void setCompletedtasks(long completedtasks) {
        this.completedtasks = completedtasks;
    }

    public long getInprogresstask() {
        return inprogresstask;
    }

    public void setInprogresstask(long inprogresstask) {
        this.inprogresstask = inprogresstask;
    }
}
