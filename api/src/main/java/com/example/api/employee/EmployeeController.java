package com.example.api.employee;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {
    
    private final EmployeeRepository employeeRepo;

    public EmployeeController(EmployeeRepository employeeRepo){
        this.employeeRepo = employeeRepo;
    }

    @GetMapping("/employee")
    public ResponseEntity<List<Employee>> getAll(){
        return ResponseEntity.ok(employeeRepo.findAll());
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable("id") UUID id){
        Employee emp = employeeRepo.findById(id).orElse(null);
        System.out.println();

        if(emp == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(emp);
    }
}
