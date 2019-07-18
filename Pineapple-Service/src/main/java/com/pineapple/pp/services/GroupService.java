package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.entities.userGroup;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.entities.UserToken;
import com.pineapple.pp.repositories.GroupRepository;
import com.pineapple.pp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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
    public List<userGroup> getGroupsFor(UserToken token) {
        try {
            System.out.println("Retrieving events for '" + token.getUsername() + "'");
            return groupRepository.findGroupsByMembership(userService.getUser(token));
        } catch (NullPointerException e) {
            return null;
        }
    }

    public userGroup add(String json) {
        userGroup userGroup = gson.fromJson(json, userGroup.class);
        if (groupRepository.existsByName(userGroup.getName())) {
            return null;
        }
        groupRepository.save(userGroup);
        return userGroup;
    }

    public userGroup getGroupFromJson(String json) {
        userGroup userGroup = gson.fromJson(json, userGroup.class);
        return groupRepository.findGroupByName(userGroup.getName());
    }

    //   public void removeGroup()

    public boolean addMembership(User friend, userGroup userGroup) {
        try {
            System.out.println("Adding" + friend.getUsername() + "to userGroup: " + userGroup.getName());
            friend.addMembership(userGroup);
            userGroup.addMembership(friend);
            groupRepository.save(userGroup);
            userRepository.save(friend);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean removeMembership(userGroup userGroup, User user) {
        System.out.println("Removing user: " + user.getUsername() + ", for userGroup: " + userGroup.getName());
        userGroup.removeMember(user);
        user.addMembership(userGroup);
        userRepository.save(user);
        groupRepository.save(userGroup);
        return true;
    }





}
