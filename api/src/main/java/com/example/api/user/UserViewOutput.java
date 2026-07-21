package com.example.api.user;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserViewOutput {

    private UUID id;

    @NotNull
    private String name;
    @NotNull
    private String email;

    public UserViewOutput(User employee) {
        this.id = employee.getId();
        this.name = employee.getName();
        this.email = employee.getEmail();
    }
}
