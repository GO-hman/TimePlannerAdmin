package com.example.api.user;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.example.api.assignment.Assignment;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue
    UUID id;
    private String name;
    private String email;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Assignment> assignments = new ArrayList<>();
}
