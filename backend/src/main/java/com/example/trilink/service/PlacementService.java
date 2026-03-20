package com.example.trilink.service;

import com.example.trilink.model.TreePosition;
import com.example.trilink.model.User;
import com.example.trilink.repository.TreePositionRepository;
import com.example.trilink.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
public class PlacementService {

    @Autowired
    private TreePositionRepository treePositionRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Finds the next available position in the tree using Slot-Major BFS
     * starting from the PREFERRED ROOT (usually the referrer).
     *
     * The fixed placement order per the v3 spec:
     * Step 1: A→A, Step 2: B→A, Step 3: C→A,
     * Step 4: A→B, Step 5: B→B, Step 6: C→B,
     * Step 7: A→C, Step 8: B→C, Step 9: C→C
     */
    @Transactional
    public TreePosition findNextPlacement(User preferredRoot) {
        User startNode = preferredRoot;

        // If no preferred root provided, try to find the global root
        if (startNode == null) {
            List<TreePosition> roots = treePositionRepository.findByLevel(0);
            if (roots.isEmpty()) {
                return null; // Let the caller handle first user registration
            }
            startNode = roots.get(0).getUser();
        }

        Queue<User> queue = new LinkedList<>();
        queue.add(startNode);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<User> currentLevelNodes = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                currentLevelNodes.add(queue.poll());
            }

            // Check Position A for ALL nodes at this level
            for (User parent : currentLevelNodes) {
                Optional<TreePosition> posA = treePositionRepository.findByParentAndPositionName(parent, "A");
                if (posA.isEmpty()) {
                    return createPlaceholder(parent, "A");
                }
            }

            // Check Position B for ALL nodes at this level
            for (User parent : currentLevelNodes) {
                Optional<TreePosition> posB = treePositionRepository.findByParentAndPositionName(parent, "B");
                if (posB.isEmpty()) {
                    return createPlaceholder(parent, "B");
                }
            }

            // Check Position C for ALL nodes at this level
            for (User parent : currentLevelNodes) {
                Optional<TreePosition> posC = treePositionRepository.findByParentAndPositionName(parent, "C");
                if (posC.isEmpty()) {
                    return createPlaceholder(parent, "C");
                }
            }

            // If level is full, add children to queue for next level (in order A, B, C)
            for (User parent : currentLevelNodes) {
                List<TreePosition> children = treePositionRepository.findByParent(parent);
                // Sort children by position name to maintain A, B, C order
                children.sort(Comparator.comparing(TreePosition::getPositionName));
                children.forEach(cp -> queue.add(cp.getUser()));
            }
        }
        return null;
    }

    private TreePosition createPlaceholder(User parent, String position) {
        TreePosition parentPos = treePositionRepository.findByUser(parent).orElse(null);
        int level = (parentPos != null) ? parentPos.getLevel() + 1 : 1;

        return TreePosition.builder()
                .parent(parent)
                .positionName(position)
                .level(level)
                .build();
    }
}
