package com.example.demo.repo;

import com.example.demo.model.employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

public interface repo extends JpaRepository<employee, Integer> {
  Optional<employee> findByUsername(String username);

}
