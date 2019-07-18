package com.pineapple.pp.controllers;

import com.pineapple.pp.entities.Event;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.entities.UserGroup;
import com.pineapple.pp.entities.UserToken;
import com.pineapple.pp.repositories.GroupRepository;
import com.pineapple.pp.services.EventService;
import com.pineapple.pp.services.GroupService;
import com.pineapple.pp.services.SecurityService;
import com.pineapple.pp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GroupController {
    private GroupService groupService;
    private UserService userService;

    @Autowired
    public GroupController(GroupService groupService, UserService userService) {
        this.groupService = groupService;
        this.userService = userService;
    }

    @GetMapping("/user-groups")
    public List<UserGroup> getGroups(@RequestHeader("authorization") String token){
        System.out.println("Retrieved request to get Groups. Parsing token");
        UserToken userDetails = SecurityService.parseToken(token);
        return groupService.getGroupsFor(userDetails);
    }

    @GetMapping("/user-groups/by-user-id/{userId}")
    public List<UserGroup> getGroups(@PathVariable("userId") Long userId){
        System.out.println("Getting groups for userId");
        User user = userService.getUserById(userId);
        return groupService.getGroupsByUser(user);
    }

//    @GetMapping("/user-groups/{groupId}")
//    public List<Event> getEvents(@PathVariable("groupId")Long groupId){
//        System.out.println("Retrieved request to get events by UserGroup ID.");
//        UserGroup userGroup = groupRepository.findGroupById(groupId);
//        return eventService.getEventsForGroup(userGroup);
//    }

}
