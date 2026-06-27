package com.example.demo.service;

import com.example.demo.model.RefreshToken;
import com.example.demo.model.employee;
import com.example.demo.repo.RefreshTokenrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

import static java.time.OffsetTime.now;


@Service
public class RefreshTokenservice {
      @Autowired
     RefreshTokenrepo refreshTokenrepo;

    public  RefreshToken createRefreshToken(employee employee){
        RefreshToken token = new RefreshToken();
        token.setEmployee(employee);
        token.setRefreshToken(UUID.randomUUID().toString());
        token.setExpiryTime(LocalDateTime.now().plusDays(7));
        token.setActive(true);
        return refreshTokenrepo.save(token);
    }
}
