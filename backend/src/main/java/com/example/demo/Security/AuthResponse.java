package com.example.demo.Security;

public class AuthResponse {
    private String accesstoken;
    private String refreshtoken;
    private String role;
    private String username;

    public String getAccesstoken() {
        return accesstoken;
    }

    public void setAccesstoken(String accesstoken) {
        this.accesstoken = accesstoken;
    }

    public String getRefreshtoken() {
        return refreshtoken;
    }

    public void setRefreshtoken(String refreshtoken) {
        this.refreshtoken = refreshtoken;
    }

    public AuthResponse(String accesstoken, String refreshtoken,String role, String username) {
        this.accesstoken = accesstoken;
        this.refreshtoken=refreshtoken;
        this.role=role;
        this.username=username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }



}
