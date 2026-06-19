package com.example.demo.controller;

import com.example.demo.Security.AuthRequest;
import com.example.demo.Security.AuthResponse;
import com.example.demo.Security.JwtUtil;
import com.example.demo.service.Customeruserdetailservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private Customeruserdetailservice userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

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

        return new AuthResponse(token);
    }
}