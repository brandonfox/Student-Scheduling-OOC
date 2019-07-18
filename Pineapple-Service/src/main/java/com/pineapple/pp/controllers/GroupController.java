package com.pineapple.pp.controllers;

import com.pineapple.pp.entities.Group;
import com.pineapple.pp.entities.UserToken;
import com.pineapple.pp.services.GroupService;
import com.pineapple.pp.services.SecurityService;
import com.pineapple.pp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

public class GroupController {
    private GroupService groupService;
    private UserService userService;
    private GroupService GroupService;

    @Autowired
    public GroupController(GroupService groupService, UserService userService, GroupService GroupService) {
        this.groupService = groupService;
        this.userService = userService;
        this.GroupService = GroupService;
    }

    @GetMapping("/groups")
    public List<Group> getGroups(@RequestHeader("authorization") String token){
        System.out.println("Retrieved request to get Groups. Parsing token");
        UserToken userDetails = SecurityService.parseToken(token);
        return GroupService.getGroupsFor(userDetails);
    }

//    @PostMapping("/groups/remove")
//    public boolean removeUser(){
//        Group group;
//
//        return group.removeFriend(remover,removee);
//    }
}
