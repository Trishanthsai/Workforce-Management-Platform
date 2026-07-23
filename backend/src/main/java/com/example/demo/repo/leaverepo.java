package com.example.demo.repo;

import com.example.demo.model.Leave;
import com.example.demo.model.employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface leaverepo extends JpaRepository<Leave,Long> {
    List<Leave>findByEmployee(employee employee);
}
