package com.example.api.employee;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EmployeeViewOutput {

    private UUID id;

    @NotNull
    private String name;
    @NotNull
    private String email;

    public EmployeeViewOutput(Employee employee) {
        this.id = employee.getId();
        this.name = employee.getName();
        this.email = employee.getEmail();
    }
}
