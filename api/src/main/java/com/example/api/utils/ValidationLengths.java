package com.example.api.utils;

import lombok.Data;

@Data
public final class ValidationLengths {

    public static final int MAX_EMAIL_LENGTH = 100;
    public static final int MAX_NAME_LENGTH = 100;

    private ValidationLengths() {
    }

}
