package com.example.trilink.repository;

import com.example.trilink.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUid(String uid);
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}
