package com.example.api.assignment;

import java.util.List;
import java.util.UUID;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
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
public class AssignmentController {

    private AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping("/assignments")
    public ResponseEntity<List<AssignmentViewOutput>> getAll() {
        try {

            List<AssignmentViewOutput> assignmentViewOutputs = assignmentService.getAll();
            return ResponseEntity.ok(assignmentViewOutputs);

        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @DeleteMapping("/assignments/{id}")
    public ResponseEntity<String> deleteById(@PathVariable("id") UUID id) {
        try {
            assignmentService.deleteAssignment(id);
            return ResponseEntity.ok().body("Raderad");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/assignments")
    public ResponseEntity<AssignmentViewOutput> createAssignment(
            @Valid @RequestBody AssignmentViewInput assignmentViewInput) {
        AssignmentViewOutput assignmentViewOutput = assignmentService.createAssignment(assignmentViewInput);
        return ResponseEntity.ok(assignmentViewOutput);

    }

    @PatchMapping("/assignments/{id}")
    public ResponseEntity<AssignmentViewOutput> patchAssignment(
            @Valid @RequestBody AssignmentViewPatchInput assignmentPatch) {
        AssignmentViewOutput assignmentViewOutput = assignmentService.patchAssignment(assignmentPatch);
        return ResponseEntity.ok(assignmentViewOutput);
    }

}