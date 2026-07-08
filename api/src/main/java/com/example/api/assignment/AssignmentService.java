package com.example.api.assignment;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AssignmentService {
    private final AssignmentRepository assignmentRepo;

    public AssignmentService(AssignmentRepository assignmentRepo) {
        this.assignmentRepo = assignmentRepo;
    }

    public List<AssignmentViewOutput> getAll() {
        List<Assignment> assignments = assignmentRepo.findAll();

        return assignments.stream().map(AssignmentViewOutput::new).toList();

    }

    public AssignmentViewOutput getById(UUID id) {
        Assignment assignment = assignmentRepo.findById(id).orElse(null);

        return new AssignmentViewOutput(assignment);
    }

    public void deleteAssignment(UUID id) {

        Assignment assignment = assignmentRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Misslyckades att radera entiteten"));

        assignmentRepo.delete(assignment);
    }

    public AssignmentViewOutput createAssignment(AssignmentViewInput assignmentViewInput) {
        Assignment assignment = new Assignment(assignmentViewInput);

        assignmentRepo.save(assignment);

        return new AssignmentViewOutput(assignment);
    }

    public AssignmentViewOutput patchAssignment(AssignmentViewPatchInput assignmentInput) {
        Assignment assignment = assignmentRepo.findById(assignmentInput.getId()).orElse(null);
        if (assignment == null) {
            throw new EntityNotFoundException();
        }

        assignment.setStartTime(assignmentInput.getStartTime());
        assignment.setEndTime(assignmentInput.getEndTime());

        assignmentRepo.save(assignment);

        return new AssignmentViewOutput(assignment);
    }

}
