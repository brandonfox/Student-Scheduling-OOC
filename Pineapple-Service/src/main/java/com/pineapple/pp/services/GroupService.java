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
    public GroupService(GroupRepository g){
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

//    public boolean addUserToGroup(User friend, UserGroup group){
//        try{
//            System.out.println("Adding" + friend.getUsername() + "to group: " + group.getName());
//            if(user.getUsername().equals(friend.getUsername())){
//                return false;
//            }
//            User us = getUserByToken(user);
//            us.addFriend(friend);
//            userRepository.save(us);
//            return true;
//        }
//        catch(Exception ex){
//            return false;
//        }
//    }



}
