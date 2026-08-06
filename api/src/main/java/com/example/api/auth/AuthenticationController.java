package com.example.api.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.services.AuthenticationService;
import com.example.api.services.JwtService;
import com.example.api.user.User;
import com.example.api.user.UserLoginViewInput;
import com.example.api.user.UserRegistrationViewInput;
import com.example.api.user.UserViewOutput;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserViewOutput> register(@RequestBody UserRegistrationViewInput input) {
        User newUser = authenticationService.registerUser(input);
        UserViewOutput userViewOutput = new UserViewOutput(newUser);
        return ResponseEntity.ok(userViewOutput);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody UserLoginViewInput input) {
        User authUser = authenticationService.authenticateUser(input);

        String jwtToken = jwtService.generateToken(authUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

}
