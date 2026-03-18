package com.example.trilink.service;

import com.example.trilink.dto.TreeNodeDTO;
import com.example.trilink.model.TreePosition;
import com.example.trilink.model.User;
import com.example.trilink.repository.TreePositionRepository;
import com.example.trilink.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TreeService {

    @Autowired
    private TreePositionRepository treePositionRepository;

    @Autowired
    private UserRepository userRepository;

    public TreeNodeDTO getSubtree(String uid) {
        User root = userRepository.findByUid(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));

        TreePosition rootPos = treePositionRepository.findByUserId(root.getId())
                .orElse(null);

        return buildTree(root, rootPos, 3); // 3×3 spec: limit depth to 3 levels
    }

    private TreeNodeDTO buildTree(User user, TreePosition position, int maxDepth) {
        if (maxDepth < 0)
            return null;

        List<TreePosition> childPositions = treePositionRepository.findByParentId(user.getId());
        // Sort by position name to ensure A, B, C order
        childPositions.sort(java.util.Comparator.comparing(TreePosition::getPositionName));
        List<TreeNodeDTO> children = childPositions.stream()
                .map(cp -> buildTree(cp.getUser(), cp, maxDepth - 1))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        String posName = (position != null && position.getPositionName() != null)
                ? position.getPositionName()
                : "ROOT";
        int level = (position != null) ? position.getLevel() : 0;

        return TreeNodeDTO.builder()
                .uid(user.getUid())
                .username(user.getUsername())
                .position(posName)
                .level(level)
                .children(children)
                .build();
    }
}
