package com.example.api;

import lombok.Data;

@Data
public class SignupViewInput {
    private String name;
    private String email;
    private String password;
}