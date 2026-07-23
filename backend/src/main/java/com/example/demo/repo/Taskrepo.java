package com.example.demo.repo;

import com.example.demo.model.Task;
import com.example.demo.model.TaskStatus;
import com.example.demo.model.employee;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Taskrepo extends JpaRepository<Task, Long> {
        List<Task> findByemployee(employee employee);

       long countBystatus(TaskStatus status);
}
