package com.example.api.user;

import lombok.Data;

//TODO: Input validation

@Data
public class UserRegistrationViewInput {

    private String name;
    private String email;
    private String password;

}
