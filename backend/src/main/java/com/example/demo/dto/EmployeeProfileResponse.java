package com.example.demo.dto;

public class EmployeeProfileResponse {
    private String name;
    private Long id;
    private String username;
    private int age;
    private String designation;
    private String email;
    private long phone_no;
    private String profilePic;

    public EmployeeProfileResponse(String name, Long id, String username, int age, String designation, String email, long phone_no, String profilePic) {
        this.name = name;
        this.id = id;
        this.username = username;
        this.age = age;
        this.designation = designation;
        this.email = email;
        this.phone_no = phone_no;
        this.profilePic = profilePic;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getPhone_no() {
        return phone_no;
    }

    public void setPhone_no(long phone_no) {
        this.phone_no = phone_no;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }
}
