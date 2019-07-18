package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.entities.Event;
import com.pineapple.pp.entities.Group;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.entities.UserToken;
import com.pineapple.pp.repositories.GroupRepository;
import com.pineapple.pp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

public class GroupService {
    private GroupRepository groupRepository;
    private UserRepository userRepository;
    private UserService userService;
    private final Gson gson;


    @Autowired
    public GroupService(GroupRepository g, UserService u) {
        this.userService = u;
        this.groupRepository = g;
        this.gson = new Gson();
    }

    /**
     * Get all groups for a specific user
     *
     * @param token The token of a specific user
     * @return a list of groups for user
     */
    public List<Group> getGroupsFor(UserToken token) {
        try {
            System.out.println("Retrieving events for '" + token.getUsername() + "'");
            return groupRepository.findGroupsByMembership(userService.getUser(token));
        } catch (NullPointerException e) {
            return null;
        }
    }

    public Group add(String json) {
        Group group = gson.fromJson(json, Group.class);
        if (groupRepository.existsByName(group.getName())) {
            return null;
        }
        groupRepository.save(group);
        return group;
    }

    public Group getGroupFromJson(String json) {
        Group group = gson.fromJson(json, Group.class);
        return groupRepository.findGroupByName(group.getName());
    }

    //   public void removeGroup()

    public boolean addMembership(User friend, Group group) {
        try {
            System.out.println("Adding" + friend.getUsername() + "to group: " + group.getName());
            friend.addMembership(group);
            group.addMembership(friend);
            groupRepository.save(group);
            userRepository.save(friend);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean removeMembership(Group group, User user) {
        System.out.println("Removing user: " + user.getUsername() + ", for Group: " + group.getName());
        group.removeMember(user);
        user.addMembership(group);
        userRepository.save(user);
        groupRepository.save(group);
        return true;
    }

    public Group getGroupByEvent(Event event){
        return groupRepository.findGroupByEvents(event);
    }




}
