package com.example.api.employee;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class EmployeeService {

    private final EmployeeRepository empRepo;

    public EmployeeService(EmployeeRepository empRepo) {
        this.empRepo = empRepo;
    }

    public EmployeeViewOutput createEmployee(EmployeeViewInput employeeIn) {

        if (empRepo.existsByEmail(employeeIn.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "An employee with this email already exists.");
        }

        Employee employee = new Employee();
        employee.setName(employeeIn.getName());
        employee.setEmail(employeeIn.getEmail());

        empRepo.save(employee);
        return new EmployeeViewOutput(employee);
    }

    public EmployeeViewOutput getEmployee(UUID id) {
        Employee employee = empRepo.findById(id).orElse(null);

        if (employee == null) {
            throw new EntityNotFoundException();
        }

        return new EmployeeViewOutput(employee);
    }

    public List<EmployeeViewOutput> getAll() {
        List<Employee> employees = empRepo.findAll();

        return employees.stream().map(EmployeeViewOutput::new).toList();
    }

    public EmployeeViewOutput patchEmployee(EmployeeViewPatchInput employeeIn, UUID id) {
        Employee employee = empRepo.findById(id).orElse(null);
        if (employee == null) {
            throw new EntityNotFoundException();
        }
        employee.setName(employeeIn.getName());
        employee.setEmail(employeeIn.getEmail());
        empRepo.save(employee);
        return new EmployeeViewOutput(employee);
    }

    public void deleteEmployee(UUID id) {
        empRepo.deleteById(id);
    }
}
