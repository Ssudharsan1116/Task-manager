package com.example.trilink.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tree_positions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TreePosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private User parent;

    @Column(name = "position_name")
    private String positionName; // A, B, or C

    @Column(nullable = false)
    private Integer level;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
