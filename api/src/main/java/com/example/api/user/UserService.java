package com.example.api.user;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.api.exceptions.ResourceConflictException;
import com.example.api.exceptions.ResourceNotFoundException;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository empRepo) {
        this.userRepo = empRepo;
    }

    public UserViewOutput createUser(UserViewInput userIn) {

        if (userRepo.existsByEmail(userIn.getEmail())) {
            throw new ResourceConflictException("A User with this email already exists.");
        }

        User user = new User();
        user.setName(userIn.getName());
        user.setEmail(userIn.getEmail());

        userRepo.save(user);
        return new UserViewOutput(user);
    }

    public UserViewOutput getUserById(UUID id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No user found with id " + id));

        return new UserViewOutput(user);
    }

    public List<UserViewOutput> getAll() {
        List<User> users = userRepo.findAll();

        return users.stream().map(UserViewOutput::new).toList();
    }

    public UserViewOutput patchUser(UserViewPatchInput userIn, UUID id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No user found with id " + id));
        user.setName(userIn.getName());
        user.setEmail(userIn.getEmail());
        userRepo.save(user);
        return new UserViewOutput(user);
    }

    // Delete cascade if user is deleted. Maybe anonymize user instead for history
    // of data etc etc.
    public void deleteUser(UUID id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No user found with id " + id));
        userRepo.delete(user);
    }
}
