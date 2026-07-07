package com.example.api.assignment;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AssignmentController{
    
    private final AssignmentRepository repo;

    public AssignmentController(AssignmentRepository repo){
        this.repo = repo;
    }

    @GetMapping("/assignments")
    public ResponseEntity<List<Assignment>> getAll(){
        List<Assignment> ass = repo.findAll();

        return ResponseEntity.ok(ass);


    }

}