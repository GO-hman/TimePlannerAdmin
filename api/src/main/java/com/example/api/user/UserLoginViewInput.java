package com.example.api.user;

import lombok.Data;

//TODO: Input validation
@Data
public class UserLoginViewInput {
    private String email;
    private String password;
}
