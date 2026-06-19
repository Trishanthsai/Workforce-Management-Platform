package com.example.demo.dto;

public class EmployeeUpdateProfileRequest {
    private String name;
    private long  phone_no;
    private String email;
    private String address;
    private int  age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getPhone_no() {
        return phone_no;
    }

    public void setPhone_no(long phone_no) {
        this.phone_no = phone_no;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public EmployeeUpdateProfileRequest(String name, long phone_no, String email, String address, int age) {
        this.name = name;
        this.phone_no = phone_no;
        this.email = email;
        this.address = address;
        this.age = age;
    }
}
