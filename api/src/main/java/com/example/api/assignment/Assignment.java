package com.example.api.assignment;

import java.time.LocalDateTime;
import java.util.UUID;

import com.example.api.employee.Employee;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "assignments")
@Data
public class Assignment {

    @Id
    @GeneratedValue
    UUID id;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @ManyToOne(optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    @JsonBackReference
    private Employee employee;

    public Assignment() {
    }

    public Assignment(AssignmentViewInput assignmentViewInput) {
        this.startTime = assignmentViewInput.getStartTime();
        this.endTime = assignmentViewInput.getEndTime();
        this.employee = assignmentViewInput.getEmployee();
    }
}
