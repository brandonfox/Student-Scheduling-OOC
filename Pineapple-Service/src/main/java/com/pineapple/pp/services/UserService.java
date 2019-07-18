package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.entities.UserToken;
import com.pineapple.pp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    
    private final Gson gson;
    private UserRepository userRepository;
    
    @Autowired
    public UserService(UserRepository userRepository, Gson gson) {
        this.userRepository = userRepository;
        this.gson = gson;
    }
    
    public List<User> list() {
        List<User> userList = new ArrayList<>();
        for (User user : getUserRepository().findAll()) {
            if (user != null) {
                userList.add(user);
            }
        }
        return userList;
    }
    
    private UserRepository getUserRepository() {
        return this.userRepository;
    }
    
    private Gson getGson() {
        return this.gson;
    }
    
    public User add(String json) {
        User user = getGson().fromJson(json, User.class);
        if (getUserRepository().existsByEmail(user.getEmail()) || getUserRepository().existsByUsername(user.getUsername())) {
            return null;
        }
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        getUserRepository().save(user);
        return user;
    }
    
    public User getUserFromJson(String json) {
        User user = getGson().fromJson(json, User.class);
        return getUser(user.getUsername());
    }
    
    public User editUser(String json) {
        User user = getGson().fromJson(json, User.class);
        User userFromDB = getUserRepository().findUserById(user.getId());
        userFromDB.setEmail(user.getEmail());
        getUserRepository().save(userFromDB);
        return userFromDB;
    }
    
    public User findByEmail(String email) {
        return getUserRepository().findByEmail(email);
    }

    /**
     * @deprecated Use getUserByToken
     * @param token token
     * @return User from token
     */
    public User getUser(UserToken token){
        return getUser(token.getUsername());
    }
    
    private User getUser(String identificationString){
        if(getUserRepository().existsByEmail(identificationString)) {
            return getUserRepository().findByEmail(identificationString);
        }
        else if(getUserRepository().existsByUsername(identificationString)) {
            return getUserRepository().findByUsername(identificationString);
        }
        return null;
    }
    
    public User getUserById(String jason) {
        User user = getUserFromJson(jason);
        return userRepository.findUserById(user.getId());
    }

    public User getUserById(Long id) {
        return userRepository.findUserById(id);
    }
    
    public List<User> getAllUsers(UserToken token, String searchParam){
        try {
            System.out.print("Retrieving all users for token with username: " + token.getUsername());
            if(searchParam == null || searchParam.equals("undefined")) {
                System.out.print("\n");
                return userRepository.findAll();
            }
            else{
                System.out.print(" and with extra search params: " + searchParam + "\n");
                return userRepository.findUsersByUsernameContains(searchParam);
            }
        }catch(NullPointerException ex) {
            return null;
        }
    }
    
    public User getUserByToken(UserToken token){
        try {
            System.out.println("Retrieving user for token with username: " + token.getUsername());
            return userRepository.findByUsername(token.getUsername());
        }catch(NullPointerException ex) {
            return null;
        }
    }

}
