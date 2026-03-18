package com.example.trilink.repository;

import com.example.trilink.model.TreePosition;
import com.example.trilink.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TreePositionRepository extends JpaRepository<TreePosition, Long> {
    Optional<TreePosition> findByUserId(Long userId);

    List<TreePosition> findByParentId(Long parentId);

    Optional<TreePosition> findByParentIdAndPositionName(Long parentId, String positionName);

    List<TreePosition> findByLevel(Integer level);
}
