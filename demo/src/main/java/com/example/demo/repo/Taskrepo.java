package com.example.demo.repo;

import com.example.demo.model.Task;
import com.example.demo.model.employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Taskrepo extends JpaRepository<Task, Integer> {
        List<Task> findByemployee(employee employee);
}
