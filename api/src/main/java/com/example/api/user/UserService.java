package com.example.api.user;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.api.SignupViewInput;
import com.example.api.role.Role;
import com.example.api.role.RoleEnum;
import com.example.api.role.RoleRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {

    @Autowired
    PasswordEncoder encoder;

    private final UserRepository userRepo;
    private RoleRepository roleRepo;

    public UserService(UserRepository userRepo, RoleRepository roleRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }

    public UserViewOutput signupUser(SignupViewInput userIn) {
        Optional<Role> optionalRole = roleRepo.findByName(RoleEnum.USER);

        if (optionalRole.isEmpty()) {
            return null;
        }

        if (userRepo.existsByEmail(userIn.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A User with this email already exists.");
        }

        User user = new User();
        user.setName(userIn.getName());
        user.setEmail(userIn.getEmail());
        user.setPassword(encoder.encode(userIn.getPassword()));
        user.setRole(optionalRole.get());

        userRepo.save(user);
        return new UserViewOutput(user);
    }

    public UserViewOutput createUser(UserViewInput userIn) {

        Optional<Role> optionalRole = roleRepo.findByName(RoleEnum.USER);

        if (optionalRole.isEmpty()) {
            return null;
        }

        if (userRepo.existsByEmail(userIn.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A User with this email already exists.");
        }

        User user = new User();
        user.setName(userIn.getName());
        user.setEmail(userIn.getEmail());
        user.setRole(userIn.getRole() == null ? optionalRole.get() : userIn.getRole());

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
