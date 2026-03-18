package com.example.trilink.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
    private String trilinkUid; // Optional: UID of the person who referred this user
}
