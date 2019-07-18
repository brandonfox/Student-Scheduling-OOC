package com.pineapple.pp.controllers;

import com.pineapple.pp.entities.Event;
import com.pineapple.pp.entities.Group;
import com.pineapple.pp.entities.UserToken;
import com.pineapple.pp.repositories.GroupRepository;
import com.pineapple.pp.services.EventService;
import com.pineapple.pp.services.GroupService;
import com.pineapple.pp.services.SecurityService;
import com.pineapple.pp.services.UserService;
import com.pineapple.pp.utils.QueryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class GroupController {
    private GroupService groupService;
    private UserService userService;
    private GroupRepository groupRepository;
    private EventService eventService;

    @Autowired
    public GroupController(GroupService groupService, UserService userService, GroupRepository groupRepository, EventService eventService) {
        this.groupService = groupService;
        this.userService = userService;
        this.groupRepository = groupRepository;
        this.eventService = eventService;
    }

    @GetMapping("/groups")
    public List<Group> getGroups(@RequestHeader("authorization") String token){
        System.out.println("Retrieved request to get Groups. Parsing token");
        UserToken userDetails = SecurityService.parseToken(token);
        return groupService.getGroupsFor(userDetails);
    }

    @GetMapping("/groups/{groupId}")
    public List<Event> getEvents(@PathVariable("groupId")Long groupId){
        System.out.println("Retrieved request to get events by group ID.");
        Group group = groupRepository.findGroupById(groupId);
        return eventService.getEventsForGroup(group);
    }



}
