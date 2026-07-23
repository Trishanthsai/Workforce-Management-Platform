package com.example.demo.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;

import javax.crypto.SecretKey;
import java.util.Date;
@Component
public class JwtUtil {
    private static final String SECRET_KEY =
            "MySuperSecretKeyForEmployeeManagementSystem2026";
    public String generateToken(UserDetails userdetails) {
        return Jwts.builder()
                .setSubject(userdetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*60*24))
                .signWith(
                        SignatureAlgorithm.HS256,
                        SECRET_KEY
                )
                .compact();

    }
    public String extractUsername(String token) {
        Claims claims=Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
    public boolean validateToken(String token, UserDetails userdetails) {
        String username=extractUsername(token);
        return (username.equals(userdetails.getUsername()));
    }
}
