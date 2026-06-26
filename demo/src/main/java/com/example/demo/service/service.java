package com.example.demo.service;

import com.example.demo.dto.EmployeeUpdateRequest;
import com.example.demo.exception.EmployeeNotFoundException;
import com.example.demo.model.employee;
import com.example.demo.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class service {

    @Autowired
    repo r;

    @Autowired
    private Taskrepo taskrepo;

    @Autowired
    private leaverepo leaverepo;

    @Autowired
    private Loginlogrepo loginlogrepo;

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

    @org.springframework.transaction.annotation.Transactional
    public void deleteemployee(Long id) {
        employee emp = r.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("employee not found with id " + id));

        // Delete associated tasks
        taskrepo.deleteAll(taskrepo.findByemployee(emp));

        // Delete associated leaves
        leaverepo.deleteAll(leaverepo.findByEmployee(emp));

        // Delete associated login logs
        loginlogrepo.deleteAll(loginlogrepo.findByEmployee(emp));

        r.delete(emp);
    }

    public employee getemployeeById(Long id) {
        return r.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("employee not found with id " + id));
    }

    public employee updateemployees(Long id, EmployeeUpdateRequest request) {

        employee existingEmployee = r.findById(id)
                .orElseThrow(() ->
                        new EmployeeNotFoundException(
                                "employee not found with id " + id
                        ));

        existingEmployee.setName(request.getName());
        existingEmployee.setAge(request.getAge());
        existingEmployee.setSalary(request.getSalary());
        existingEmployee.setDesignation(request.getDesignation());
        existingEmployee.setEmail(request.getEmail());
        existingEmployee.setPhone_no(request.getPhone_no());

        return r.save(existingEmployee);
    }
}
