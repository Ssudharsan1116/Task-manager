package com.example.trilink.repository;

import com.example.trilink.model.TreePosition;
import com.example.trilink.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TreePositionRepository extends JpaRepository<TreePosition, Long> {
    Optional<TreePosition> findByUser(User user);

    List<TreePosition> findByParent(User parent);

    Optional<TreePosition> findByParentAndPositionName(User parent, String positionName);

    List<TreePosition> findByLevel(Integer level);
}
