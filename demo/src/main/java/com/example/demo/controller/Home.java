package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class Home {
   @GetMapping("admin/home")
    @ResponseBody
    public String adminhome(){
       return "admin page";
   }
   @GetMapping("employee/home")
    @ResponseBody
    public String employeehome(){
       return "employee page";
   }
}
