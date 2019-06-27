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
    public UserRepository getUserRepository() {
        return userRepository;
    }

    @Override
    public Gson getGson() {
        return gson;
    }
}
