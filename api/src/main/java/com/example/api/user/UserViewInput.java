package com.example.api.user;

import com.example.api.role.Role;
import com.example.api.utils.ValidationLengths;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserViewInput {

    @Size(max = ValidationLengths.MAX_NAME_LENGTH)
    @NotNull(message = "Ange namn")
    private String name;

    @Size(max = ValidationLengths.MAX_EMAIL_LENGTH)
    @NotNull(message = "Ange e-postadress")
    @Email(message = "Ogiltig e-postadress")
    private String email;

    private String password;

    @NotNull(message = "Välj en roll")
    private Role role;

}
