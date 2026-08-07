package com.example.api.assignment;

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
public class AssignmentController {

    private AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping("/assignments")
    public ResponseEntity<List<AssignmentViewOutput>> getAll() {
        List<AssignmentViewOutput> assignmentViewOutputs = assignmentService.getAll();
        return ResponseEntity.ok(assignmentViewOutputs);
    }

    @DeleteMapping("/assignments/{id}")
    public ResponseEntity<String> deleteById(@PathVariable("id") UUID id) {
        assignmentService.deleteAssignment(id);
        return ResponseEntity.ok().body("Raderad");
    }

    @PostMapping("/assignments")
    public ResponseEntity<AssignmentViewOutput> createAssignment(
            @Valid @RequestBody AssignmentViewInput assignmentViewInput) {
        AssignmentViewOutput assignmentViewOutput = assignmentService.createAssignment(assignmentViewInput);
        return ResponseEntity.ok(assignmentViewOutput);

    }

    @PatchMapping("/assignments/{id}")
    public ResponseEntity<AssignmentViewOutput> patchAssignment(
            @Valid @RequestBody AssignmentViewPatchInput assignmentPatch, @PathVariable("id") UUID id) {
        AssignmentViewOutput assignmentViewOutput = assignmentService.patchAssignment(assignmentPatch);
        return ResponseEntity.ok(assignmentViewOutput);
    }

}