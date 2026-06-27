package com.example.demo.Security;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import java.io.IOException;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {
    private final Map<String, Integer> requestCounts =
            new ConcurrentHashMap<>();

    private final Map<String, Long> requestTimes =
            new ConcurrentHashMap<>();
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if(auth == null){

            filterChain.doFilter(request,response);

            return;
        }
        String username = auth.getName();
        long currentTime =
                System.currentTimeMillis();
        requestTimes.putIfAbsent(
                username,
                currentTime
        );

        requestCounts.putIfAbsent(
                username,0

        );
        if(currentTime - requestTimes.get(username) > 60000){

            requestTimes.put(username,currentTime);

            requestCounts.put(username,0);
        }

        if(currentTime - requestTimes.get(username) > 60000){

            requestTimes.put(username,currentTime);

            requestCounts.put(username,0);
        }

        requestCounts.put(
                username,
                requestCounts.get(username) + 1
        );

        if(requestCounts.get(username) > 50){

            response.setStatus(429);

            response.getWriter().write(
                    "Rate limit exceeded. Try again later."
            );

            return;
        }

        filterChain.doFilter(request,response);
    }


}
