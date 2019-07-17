package com.pineapple.pp.controllers;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.pineapple.pp.entities.FriendRequest;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.entities.UserToken;
import com.pineapple.pp.services.FriendService;
import com.pineapple.pp.services.SecurityService;
import com.pineapple.pp.services.UserService;
import com.pineapple.pp.utils.QueryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    
    private UserService userService;
    private FriendService friendService;
    
    @Autowired
    public UserController(UserService userService, FriendService friendService) {
        this.userService = userService;
        this.friendService = friendService;
    }
    
    @GetMapping("/users")
    public List<User> getUsersInfo(@RequestHeader("authorization") String token, @RequestParam(value = "search", required = false) String search) {
        System.out.println("Retrieved request to get users. Parsing token");
        UserToken userDetails = SecurityService.parseToken(token);
        return userService.getAllUsers(userDetails, search);
    }

    
    @GetMapping("/user")
    public User getUserInfo(@RequestHeader("authorization") String token) {
        System.out.println("Retrieved request to get users. Parsing token");
        UserToken userDetails = SecurityService.parseToken(token);
        return userService.getUserByToken(userDetails);
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

    @GetMapping("/friends")
    public Set<User> getFriends(@RequestParam(value = "search", required = false) String searchParam, @RequestHeader("authorization") String token){
        User user = userService.getUserByToken(SecurityService.parseToken(token));
        return friendService.getFriendsOfUser(user,searchParam);
    }
    @PostMapping("/friends/add")
    public boolean addFriend(@RequestHeader("authorization") String token, @RequestBody String userJson){
        User friend = userService.getUserFromJson(userJson);
        User user = userService.getUserByToken(SecurityService.parseToken(token));
        return friendService.sendFriendRequest(user,friend);
    }

    @GetMapping("/friends/requests/sent")
    public Set<User> getRequestedFriendsBy(@RequestHeader("authorization") String token){
        User user = userService.getUserByToken(SecurityService.parseToken(token));
        return friendService.getRequestedFriendsBy(user);
    }

    @GetMapping("/friends/requests/received")
    public Set<User> getUsersWhoRequestedFriend(@RequestHeader("authorization") String token){
        User user = userService.getUserByToken(SecurityService.parseToken(token));
        return friendService.getUsersWhoRequestedFriendWith(user);
    }
    @PostMapping("/friends/requests/deny")
    public boolean denyFriendRequest(@RequestHeader("authorization") String token, @RequestBody String user){
        User denier = userService.getUserByToken(SecurityService.parseToken(token));
        User deniee = userService.getUserFromJson(user);
        return friendService.denyRequest(denier,deniee);
    }
    @PostMapping("/friends/remove")
    public boolean removeFriend(@RequestHeader("authorization") String token, @RequestBody String user){
        User remover = userService.getUserByToken(SecurityService.parseToken(token));
        User removee = userService.getUserFromJson(user);
        return friendService.removeFriend(remover,removee);
    }
}
