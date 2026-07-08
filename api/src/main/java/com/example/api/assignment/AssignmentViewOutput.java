package com.example.api.assignment;

import java.time.LocalDateTime;
import java.util.UUID;

import com.example.api.employee.Employee;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssignmentViewOutput {

    @NotNull
    private UUID id;

    @NotNull
    private LocalDateTime startTime;
    @NotNull
    private LocalDateTime endTime;

    @NotNull
    private Employee employee;

    public AssignmentViewOutput(Assignment assignment) {
        this.id = assignment.getId();
        this.startTime = assignment.getStartTime();
        this.endTime = assignment.getEndTime();
        this.employee = assignment.getEmployee();
    }

}
