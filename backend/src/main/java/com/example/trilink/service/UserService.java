package com.example.trilink.service;

import com.example.trilink.dto.UserProfileDTO;
import com.example.trilink.model.TreePosition;
import com.example.trilink.model.User;
import com.example.trilink.repository.TriLinkRelationshipRepository;
import com.example.trilink.repository.TreePositionRepository;
import com.example.trilink.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TreePositionRepository treePositionRepository;

    @Autowired
    private TriLinkRelationshipRepository trilinkRelationshipRepository;

    public UserProfileDTO getUserProfile(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        TreePosition pos = treePositionRepository.findByUser(user).orElseThrow();

        String referrerUsername = pos.getParent() != null ? pos.getParent().getUsername() : "ROOT";
        long totaltrilinks = trilinkRelationshipRepository.countByReferrer(user);

        return UserProfileDTO.builder()
                .username(user.getUsername())
                .uid(user.getUid())
                .ownPosition(pos.getPositionName() != null ? pos.getPositionName() : "ROOT")
                .totaltrilinks(totaltrilinks)
                .referrerUsername(referrerUsername)
                .build();
    }
}
