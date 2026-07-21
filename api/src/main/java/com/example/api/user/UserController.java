package com.example.api.user;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<List<UserViewOutput>> getAll() {
        var users = userService.getAll();
        if (users == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserViewOutput> getUser(@PathVariable("id") UUID id) {
        UserViewOutput userViewOut = userService.getUserById(id);

        if (userViewOut == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(userViewOut);
    }

    @PostMapping("/user")
    public ResponseEntity<UserViewOutput> createUser(
            @Valid @RequestBody UserViewInput userIn) {
        UserViewOutput userViewOut = userService.createUser(userIn);

        return ResponseEntity.ok(userViewOut);
    }

    @PatchMapping("/user/{id}")
    public ResponseEntity<UserViewOutput> patchUser(@Valid @RequestBody UserViewPatchInput userIn,
            @PathVariable("id") UUID id) {
        var userViewOut = userService.patchUser(userIn, id);

        return ResponseEntity.ok(userViewOut);

    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") UUID id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
