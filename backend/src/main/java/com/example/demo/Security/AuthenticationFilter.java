package com.example.demo.Security;

import com.example.demo.service.Customeruserdetailservice;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private Customeruserdetailservice customeruserdetailservice;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("FILTER HIT");
        if(request.getServletPath().equals("/auth/login")) {
            filterChain.doFilter(request,response);
            return;
        }
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }
        String token = authHeader.substring(7);
        String Username= jwtUtil.extractUsername(token);
        UserDetails userDetails = customeruserdetailservice.loadUserByUsername(Username);
        if(jwtUtil.validateToken(token,userDetails)) {
            System.out.println("USERNAME = " + userDetails.getUsername());
            System.out.println("AUTHORITIES = " + userDetails.getAuthorities());
            UsernamePasswordAuthenticationToken Authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext()
                    .setAuthentication(Authentication);
        }
        filterChain.doFilter(request,response);
    }


}
