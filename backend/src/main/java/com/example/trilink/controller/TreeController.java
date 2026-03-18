package com.example.trilink.controller;

import com.example.trilink.dto.TreeNodeDTO;
import com.example.trilink.service.TreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tree")
public class TreeController {

    @Autowired
    private TreeService treeService;

    @GetMapping("/subtree/{uid}")
    public ResponseEntity<TreeNodeDTO> getSubtree(@PathVariable String uid) {
        return ResponseEntity.ok(treeService.getSubtree(uid));
    }
}
