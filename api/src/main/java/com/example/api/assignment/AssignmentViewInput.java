package com.example.api.assignment;

import java.time.LocalDateTime;

import com.example.api.user.User;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssignmentViewInput {

    @NotNull(message = "Ange starttid")
    private LocalDateTime startTime;

    @NotNull(message = "Ange sluttid")
    private LocalDateTime endTime;

    @NotNull(message = "Tilldela resurs")
    private User user;

}
