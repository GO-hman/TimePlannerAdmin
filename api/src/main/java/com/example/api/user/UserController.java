package com.example.api.user;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RequestMapping("/user")
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<List<UserViewOutput>> getAll() {
        var users = userService.getAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserViewOutput> getUser(@PathVariable("id") UUID id) {
        UserViewOutput userViewOut = userService.getUserById(id);

        return ResponseEntity.ok(userViewOut);
    }

    @PostMapping("/")
    public ResponseEntity<UserViewOutput> createUser(
            @Valid @RequestBody UserViewInput userIn) {
        UserViewOutput userViewOut = userService.createUser(userIn);

        return ResponseEntity.ok(userViewOut);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserViewOutput> patchUser(@Valid @RequestBody UserViewPatchInput userIn,
            @PathVariable("id") UUID id) {
        var userViewOut = userService.patchUser(userIn, id);

        return ResponseEntity.ok(userViewOut);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserViewOutput> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        UserViewOutput userViewOut = new UserViewOutput(currentUser);

        return ResponseEntity.ok(userViewOut);
    }
}
