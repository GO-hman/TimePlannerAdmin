package com.example.api.employee;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employee")
    public ResponseEntity<List<EmployeeViewOutput>> getAll() {
        var employees = employeeService.getAll();
        if (employees == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<EmployeeViewOutput> getEmployee(@PathVariable("id") UUID id) {
        EmployeeViewOutput emp = employeeService.getEmployee(id);

        if (emp == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(emp);
    }

    @PostMapping("/employee")
    public ResponseEntity<EmployeeViewOutput> createEmployee(
            @Valid @RequestBody EmployeeViewInput employeeIn) {
        EmployeeViewOutput employeeViewOut = employeeService.createEmployee(employeeIn);

        return ResponseEntity.ok(employeeViewOut);
    }

    @PatchMapping("/employee/{id}")
    public ResponseEntity<EmployeeViewOutput> patchEmployee(@Valid @RequestBody EmployeeViewPatchInput employeeIn,
            @PathVariable("id") UUID id) {
        var employeeOut = employeeService.patchEmployee(employeeIn, id);

        return ResponseEntity.ok(employeeOut);

    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") UUID id) {
        try {
            employeeService.deleteEmployee(id);
            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
