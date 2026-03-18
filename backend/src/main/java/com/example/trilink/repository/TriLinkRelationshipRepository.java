package com.example.trilink.repository;

import com.example.trilink.model.TriLinkRelationship;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TriLinkRelationshipRepository extends JpaRepository<TriLinkRelationship, Long> {
    List<TriLinkRelationship> findByReferrerId(Long referrerId);

    long countByReferrerId(Long referrerId);
}
