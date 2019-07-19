package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.entities.UserGroup;
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
    public List<UserGroup> getGroupsFor(UserToken token) {
        try {
            System.out.println("Retrieving events for '" + token.getUsername() + "'");
            return groupRepository.findGroupsByMembership(userService.getUser(token));
        } catch (NullPointerException e) {
            return null;
        }
    }

    public List<UserGroup> getGroupsByUser(User user) {
        try {
            System.out.println("Getting groups for: " + user.getUsername());
            return groupRepository.findGroupsByMembership(user);
        } catch(NullPointerException ex) {
            return null;
        }
    }

    public void addUserToGroup(Long groupId, User user) {
        UserGroup userGroup = getGroupById(groupId);
        userGroup.addMembership(user);
        groupRepository.save(userGroup);
    }

    public UserGroup getGroupById(Long id) {
        return groupRepository.findGroupById(id);
    }

    public UserGroup add(String json, User user) {
        UserGroup userGroup = gson.fromJson(json, UserGroup.class);
        if (groupRepository.existsByName(userGroup.getName())) {
            return null;
        }
        userGroup.addMembership(user);
        groupRepository.save(userGroup);
        return userGroup;
    }

    public UserGroup getGroupFromJson(String json) {
        UserGroup userGroup = gson.fromJson(json, UserGroup.class);
        return groupRepository.findGroupByName(userGroup.getName());
    }

    //   public void removeGroup()

    public boolean addMembership(User friend, UserGroup userGroup) {
        try {
            System.out.println("Adding" + friend.getUsername() + "to UserGroup: " + userGroup.getName());
//            friend.addMembership(userGroup);
//            userGroup.addMembership(friend);
            groupRepository.save(userGroup);
            userRepository.save(friend);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean removeMembership(UserGroup userGroup, User user) {
        System.out.println("Removing user: " + user.getUsername() + ", for UserGroup: " + userGroup.getName());
//        userGroup.removeMember(user);
//        user.addMembership(userGroup);
        userRepository.save(user);
        groupRepository.save(userGroup);
        return true;
    }





}
