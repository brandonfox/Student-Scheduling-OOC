package com.pineapple.pp.controllers;

import com.pineapple.pp.entities.User;
import com.pineapple.pp.repositories.UserRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class UserController {
    private UserRepository repository;
    
    public UserController(UserRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping("/user")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<User> users() {
        return new ArrayList<>(repository.findAll());
    }
}
