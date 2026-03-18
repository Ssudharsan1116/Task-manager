package com.example.trilink.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TreeNodeDTO {
    private String uid;
    private String username;
    private String position;
    private Integer level;
    private List<TreeNodeDTO> children;
}
