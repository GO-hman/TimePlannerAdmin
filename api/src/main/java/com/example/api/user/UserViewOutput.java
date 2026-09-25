package com.example.api.user;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.example.api.assignment.Assignment;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserViewOutput {

    private UUID id;

    @NotNull
    private String name;
    @NotNull
    private String email;

    private List<Assignment> assignments = new ArrayList<>();

    public UserViewOutput(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.assignments = user.getAssignments();
    }
}
