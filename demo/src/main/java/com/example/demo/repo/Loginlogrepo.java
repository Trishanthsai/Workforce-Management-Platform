package com.example.demo.repo;

import com.example.demo.model.Loginlog;
import com.example.demo.model.employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Loginlogrepo extends JpaRepository<Loginlog,Long> {
    Loginlog findTopByEmployeeAndLogoutTimeIsNullOrderByLoginTimeDesc(
            employee employee);
    List<Loginlog> findByEmployee(employee employee);
}
