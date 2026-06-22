package com.example.demo.controller;

import com.example.demo.Security.AuthRequest;
import com.example.demo.Security.AuthResponse;
import com.example.demo.Security.JwtUtil;
import com.example.demo.model.Loginlog;
import com.example.demo.model.employee;
import com.example.demo.repo.Loginlogrepo;
import com.example.demo.repo.repo;
import com.example.demo.service.Customeruserdetailservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private Customeruserdetailservice userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    repo r;
    @Autowired
    Loginlogrepo loginlogrepo;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        System.out.println("LOGIN ENDPOINT HIT");
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserDetails user =
                userDetailsService.loadUserByUsername(
                        request.getUsername()
                );

        String token = jwtUtil.generateToken(user);
        employee e=r.findByUsername(request.getUsername()).get();
        Loginlog log=new Loginlog();
        log.setEmployee(e);
        log.setLoginTime(LocalDateTime.now());
        loginlogrepo.save(log);



        return new AuthResponse(token);
    }
}