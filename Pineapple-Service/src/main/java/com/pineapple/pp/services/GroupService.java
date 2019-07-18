package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.entities.UserGroup;
import com.pineapple.pp.entities.UserToken;
import com.pineapple.pp.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

public class GroupService {
    private GroupRepository groupRepository;
    private UserService userService;
    private final Gson gson;


    @Autowired
    public GroupService(GroupRepository g, UserService u){
        this.userService = u;
        this.groupRepository = g;
        this.gson = new Gson();
    }

    /**
     * Get all groups for a specific user
     * @param token The token of a specific user
     * @return a list of groups for user
     */
    public List<UserGroup> getGroupsFor(UserToken token){
        try {
            System.out.println("Retrieving events for '" + token.getUsername() + "'");
            return groupRepository.findUserGroupsByMembership(userService.getUser(token));
        } catch (NullPointerException e) {
            return null;
        }
    }

    public UserGroup add(String json) {
        UserGroup group = gson.fromJson(json, UserGroup.class);
        if (groupRepository.existsByName(group.getName())) {
            return null;
        }
        groupRepository.save(group);
        return group;
    }

    public UserGroup getGroupFromJson(String json) {
        UserGroup group = gson.fromJson(json, UserGroup.class);
        return groupRepository.findUserGroupByName(group.getName());
    }

    //   public void removeGroup()

    public boolean addMembership(User friend, UserGroup group){
        try{
            System.out.println("Adding" + friend.getUsername() + "to group: " + group.getName());
            group.addMembership(friend);
            groupRepository.save(group);
            return true;
        }
        catch(Exception ex){
            return false;
        }
    }

    public boolean removeMembership(UserGroup group, User user){
        System.out.println("Removing user: " + user.getUsername() + ", for Group: " + group.getName());
        group.removeMember(user);
        groupRepository.save(group);
        return true;
    }





}
