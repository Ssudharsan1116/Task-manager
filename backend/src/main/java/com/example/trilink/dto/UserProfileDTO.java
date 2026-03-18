package com.example.trilink.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {
    private String username;
    private String uid;
    private String ownPosition;
    private long totaltrilinks;
    private String referrerUsername;
}
