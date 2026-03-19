package com.example.trilink.repository;

import com.example.trilink.model.TriLinkRelationship;
import com.example.trilink.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TriLinkRelationshipRepository extends JpaRepository<TriLinkRelationship, Long> {
    List<TriLinkRelationship> findByReferrer(User referrer);

    long countByReferrer(User referrer);
}
