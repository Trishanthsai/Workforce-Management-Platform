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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
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
        if (!"ADMIN".equalsIgnoreCase(e.getRole())) {
            Loginlog log=new Loginlog();
            log.setEmployee(e);
            log.setLoginTime(LocalDateTime.now());
            loginlogrepo.save(log);
        }


        return new AuthResponse(token, e.getRole(), e.getUsername());

    }
    @PostMapping("/logout")
    public String logout(@RequestParam String username) {
        System.out.println("LOGOUT ENDPOINT HIT FOR USER: " + username);
        employee e = r.findByUsername(username).orElse(null);
        if (e != null && !"ADMIN".equalsIgnoreCase(e.getRole())) {
            Loginlog activeLog = loginlogrepo.findTopByEmployeeAndLogoutTimeIsNullOrderByLoginTimeDesc(e);
            if (activeLog != null) {
                activeLog.setLogoutTime(LocalDateTime.now());
                loginlogrepo.save(activeLog);
                System.out.println("Logout time updated for user: " + username);
            }
        }
        return "Logged out successfully";
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PutMapping("/reset-password")
    public String resetPassword() {

        employee admin = r.findByUsername("ram_960")
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        admin.setPassword(passwordEncoder.encode("admin123"));

        r.save(admin);

        return "Password reset successfully";
    }
}