package com.example.demo.service;

import com.example.demo.exception.EmployeeNotFoundException;
import com.example.demo.model.employee;
import com.example.demo.repo.repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class service {

    @Autowired
    repo r;


    public List<employee> getemployees() {
        return r.findAll();
    }

    public Page<employee> getemployeesPage(int page, int size, String sortBy, String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return r.findAll(pageable);
    }

    public employee addemployee(employee employee) {
        return r.save(employee);
    }

    public void deleteemployee(Integer id) {
        employee emp = r.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("employee not found with id " + id));

        r.delete(emp);
    }

    public employee getemployeeById(Integer id) {
        return r.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("employee not found with id " + id));
    }

    public employee updateemployees(Integer id, employee employee) {
        r.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("employee not found with id " + id));

        employee.setId(id);
        return r.save(employee);
    }
}
