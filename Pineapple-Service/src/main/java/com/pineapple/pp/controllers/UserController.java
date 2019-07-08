package com.pineapple.pp.controllers;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.entities.UserToken;
import com.pineapple.pp.services.SecurityService;
import com.pineapple.pp.services.UserService;
import com.pineapple.pp.utils.QueryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    
    private UserService userService;
    
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/users")
    public List<User> getUsersInfo(@RequestHeader("authorization") String token) {
        System.out.println("Retrieved request to get users. Parsing token");
        UserToken userDetails = SecurityService.parseToken(token);
        return userService.getAllUsers(userDetails);
    }
    
    @GetMapping("/user")
    public User getUserInfo(@RequestHeader("authorization") String token) {
        System.out.println("Retrieved request to get users. Parsing token");
        UserToken userDetails = SecurityService.parseToken(token);
        return userService.getUserByUsername(userDetails);
    }
    
    @PostMapping(path = "/register")
    @ResponseBody
    public QueryResponse add(@RequestBody String json) {
        System.out.print("Creating new user " + json + "... ");
        User user = userService.add(json);
        if (user == null) {
            System.out.print("Fail..\n");
            return new QueryResponse(false,"username");
        }
        else {
            System.out.print("Success!\n");
            return new QueryResponse(true, SecurityService.createUserAuthenticationToken(user));
        }
    }
    
    @PostMapping("/login")
    @ResponseBody
    public QueryResponse login(@RequestBody String json) {
        User user = userService.getUserFromJson(json);
        System.out.print("Processing login request: ");
        if(user == null){
            //Username or email is incorrect
            System.out.print("User " + json + " not found\n");
            return new QueryResponse(false,"username");
        }
        //TODO Consider moving this into its own class / functions
        JsonObject jsonObject = (JsonObject) new JsonParser().parse(json);
        if(SecurityService.isValidCredentials(user,jsonObject.get("password").getAsString())){
            System.out.print("User " + json + " logging in\n");
            //If user credentials were valid send a response with a authentication token
            return new QueryResponse(true,SecurityService.createUserAuthenticationToken(user));
        }
        System.out.print("User " + json + " wrong password\n");
        //User exists but password is wrong
        //Tell frontend username is wrong for security reasons
        return new QueryResponse(false,"username");
    }
    
    @GetMapping("/all")
    public Iterable<User> findAll() {
        System.out.println("Retrieving all users");
        return userService.list();
    }
    
    @PostMapping("/find")
    public User getUser(@RequestBody String json) {
        return userService.getUserFromJson(json);
    }
    
    @PostMapping("/update")
    public User editUser(@RequestBody String json) {
        return userService.editUser(json);
    }
}
