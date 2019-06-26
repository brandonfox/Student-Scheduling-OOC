package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    
    private UserRepository userRepository;
    
    private final Gson gson;
    
    @Autowired
    public UserServiceImpl(UserRepository userRepository, Gson gson) {
        this.userRepository = userRepository;
        this.gson = gson;
    }
    
    
    @Override
    public List<User> list() {
        List<User> userList = new ArrayList<>();
        for (User user : userRepository.findAll()) {
            if (user != null) {
                userList.add(user);
            }
        }
        return userList;
    }
    
    @Override
    public User add(String json) {
        User user = gson.fromJson(json, User.class);
        if (userRepository.existsByEmail(user.getEmail())) {
            return null;
        }
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        userRepository.save(user);
        return user;
    }
    
    @Override
    public User getUser(String json) {
        User user = gson.fromJson(json, User.class);
        if (!userRepository.existsByEmail(user.getEmail())) {
            return null;
        }
        return userRepository.findByEmail(user.getEmail());
    }
    
    @Override
    public User editUser(String json) {
        User user = gson.fromJson(json, User.class);
        User userFromDB = userRepository.findUserById(user.getId());
        userFromDB.setEmail(user.getEmail());
        userRepository.save(userFromDB);
        return userFromDB;
    }
    
    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
