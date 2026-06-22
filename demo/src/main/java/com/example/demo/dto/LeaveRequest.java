package com.example.demo.dto;

import java.time.LocalDate;

public class LeaveRequest {
    private String leavetype;
    private String reason;
    private LocalDate fromdate;
    private LocalDate todate;

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
}
