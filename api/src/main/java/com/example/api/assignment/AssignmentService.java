package com.example.api.assignment;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.api.exceptions.ResourceNotFoundException;
import com.example.api.user.UserRepository;

@Service
public class AssignmentService {
    private final AssignmentRepository assignmentRepo;
    private final UserRepository userRepo;

    public AssignmentService(AssignmentRepository assignmentRepo, UserRepository userRepo) {
        this.assignmentRepo = assignmentRepo;
        this.userRepo = userRepo;
    }

    public List<AssignmentViewOutput> getAll() {
        List<Assignment> assignments = assignmentRepo.findAll();

        return assignments.stream().map(AssignmentViewOutput::new).toList();

    }

    public AssignmentViewOutput getById(UUID id) {
        Assignment assignment = assignmentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No assignment found with id " + id));

        return new AssignmentViewOutput(assignment);
    }

    public void deleteAssignment(UUID id) {

        Assignment assignment = assignmentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No assignment found with id " + id));

        assignmentRepo.delete(assignment);
    }

    public AssignmentViewOutput createAssignment(AssignmentViewInput assignmentViewInput) {
        Assignment assignment = new Assignment(assignmentViewInput);

        assignmentRepo.save(assignment);

        return new AssignmentViewOutput(assignment);
    }

    public AssignmentViewOutput patchAssignment(AssignmentViewPatchInput assignmentInput) {
        Assignment assignment = assignmentRepo.findById(assignmentInput.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No assignment found with id " + assignmentInput.getId()));

        assignment.setStartTime(assignmentInput.getStartTime());
        assignment.setEndTime(assignmentInput.getEndTime());

        assignmentRepo.save(assignment);

        return new AssignmentViewOutput(assignment);
    }

    public List<AssignmentViewOutput> getByUserId(UUID id) {
        if (!userRepo.existsById(id)) {
            throw new ResourceNotFoundException("No user found with id " + id);
        }

        List<Assignment> assignments = assignmentRepo.findByUserId(id);
        return assignments.stream().map(AssignmentViewOutput::new).toList();
    }
}
