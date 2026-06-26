package com.example.demo.repo;

import com.example.demo.model.employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface repo extends JpaRepository<employee, Long> {
  Optional<employee> findByUsername(String username);

  List<employee> findByRole(String admin);
}
