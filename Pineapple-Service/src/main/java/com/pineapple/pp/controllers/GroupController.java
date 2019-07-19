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

    @PostMapping(path = "/user-groups")
    public void createGroup(@RequestHeader("authorization") String token, @RequestBody String groupForm) {
        UserToken userDetails = SecurityService.parseToken(token);
        System.out.println("Creating new group " + groupForm + " for " + userDetails.getUsername());
        User user = userService.getUserByToken(userDetails);
        UserGroup userGroup = groupService.add(groupForm, user);
        if (userGroup == null) { System.out.println("Group creation failed"); }
        else System.out.println("Group created!");
    }

    @GetMapping("/user-groups/by-user-id/{userId}")
    public List<UserGroup> getGroups(@PathVariable("userId") Long userId){
        User user = userService.getUserById(userId);
        return groupService.getGroupsByUser(user);
    }

    @PostMapping("/user-groups/add-user/{groupId}/{username}")
    public void addUserToGroup(@PathVariable("groupId") Long groupId, @PathVariable("username") String username) {
        System.out.println("Adding " + username + " to group " + groupId);
        User user = userService.getUserByUsername(username);
        System.out.println(user.getEmail() + " id: " + user.getId());
        groupService.addUserToGroup(groupId, user);
    }

//    @GetMapping("/user-groups/{groupId}")
//    public List<Event> getEvents(@PathVariable("groupId")Long groupId){
//        System.out.println("Retrieved request to get events by UserGroup ID.");
//        UserGroup userGroup = groupRepository.findGroupById(groupId);
//        return eventService.getEventsForGroup(userGroup);
//    }

}
