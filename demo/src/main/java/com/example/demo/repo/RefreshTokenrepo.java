package com.example.demo.repo;

import com.example.demo.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenrepo extends JpaRepository<RefreshToken,Long> {
    Optional<RefreshToken>findByRefreshToken(String refreshtoken);
    void deleteByEmployee(com.example.demo.model.employee employee);
}
