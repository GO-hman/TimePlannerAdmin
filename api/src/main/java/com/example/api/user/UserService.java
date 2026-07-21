package com.example.api.user;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository empRepo) {
        this.userRepo = empRepo;
    }

    public UserViewOutput createUser(UserViewInput userIn) {

        if (userRepo.existsByEmail(userIn.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A User with this email already exists.");
        }

        User user = new User();
        user.setName(userIn.getName());
        user.setEmail(userIn.getEmail());

        userRepo.save(user);
        return new UserViewOutput(user);
    }

    public UserViewOutput getUserById(UUID id) {
        User user = userRepo.findById(id).orElse(null);

        if (user == null) {
            throw new EntityNotFoundException();
        }

        return new UserViewOutput(user);
    }

    public List<UserViewOutput> getAll() {
        List<User> users = userRepo.findAll();

        return users.stream().map(UserViewOutput::new).toList();
    }

    public UserViewOutput patchUser(UserViewPatchInput userIn, UUID id) {
        User user = userRepo.findById(id).orElse(null);
        if (user == null) {
            throw new EntityNotFoundException();
        }
        user.setName(userIn.getName());
        user.setEmail(userIn.getEmail());
        userRepo.save(user);
        return new UserViewOutput(user);
    }

    public void deleteUser(UUID id) {
        userRepo.deleteById(id);
    }
}
