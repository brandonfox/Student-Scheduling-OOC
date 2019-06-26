package com.pineapple.pp.controllers;

import com.pineapple.pp.entities.User;
import com.pineapple.pp.exception.ResourceNotFoundException;
import com.pineapple.pp.repositories.UserRepository;
import com.pineapple.pp.services.UserService;
import com.pineapple.pp.utils.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    
    private UserService userService;
    
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping(path = "/add")
    public String add(@RequestBody String json) {
        if (userService.add(json) == null) {
            return "fail";
        }
        else {
            return "success";
        }
    }
    
    @PostMapping("/login")
    public LoginResponse login(@RequestBody String json) {
        User user = userService.getUser(json);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setEmail(user.getEmail());
        return loginResponse;
    }
    
    @GetMapping("/all")
    public Iterable<User> findAll() {
        return userService.list();
    }
    
    @PostMapping("/find")
    public User getUser(@RequestBody String json) {
        return userService.getUser(json);
    }
    
    @PostMapping("/update")
    public User editUser(@RequestBody String json) {
        return userService.editUser(json);
    }
}
