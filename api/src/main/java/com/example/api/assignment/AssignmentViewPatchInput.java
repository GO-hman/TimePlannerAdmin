package com.example.api.assignment;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssignmentViewPatchInput {

    @NotNull
    private UUID id;

    @NotNull(message = "Ange starttid")
    private LocalDateTime startTime;

    @NotNull(message = "Ange sluttid")
    private LocalDateTime endTime;
}
