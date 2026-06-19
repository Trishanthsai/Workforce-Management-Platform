package com.example.demo.repo;

import com.example.demo.model.Auditlogs;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Auditlogsrepo  extends JpaRepository<Auditlogs, Long> {


}
