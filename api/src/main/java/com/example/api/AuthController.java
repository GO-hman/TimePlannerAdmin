package com.example.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.api.user.UserService;
import com.example.api.user.UserViewInput;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    com.example.api.user.UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder encoder;
    @Autowired
    com.example.api.security.JwtUtil jwtUtils;

    @PostMapping("/signin")
    public String authenticateUser(@RequestBody SigninViewInput user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()));
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtUtils.generateToken(userDetails.getUsername());
    }

    @PostMapping("/signup")
    public String registerUser(@RequestBody SignupViewInput user) {
        System.out.println("RECEIVED: " + user.getEmail());
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Error: Username is already taken!";
        }

        userService.signupUser(user);
        return "User registered successfully!";
    }
}