package com.example.demo.repo;

import com.example.demo.model.Loginlog;
import com.example.demo.model.employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Loginlogrepo extends JpaRepository<Loginlog,Long> {
    Loginlog findTopByEmployeeAndLogoutTimeIsNullOrderByLoginTimeDesc(
            employee employee);
}
