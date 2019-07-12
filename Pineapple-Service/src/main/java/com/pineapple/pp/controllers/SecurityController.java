package com.pineapple.pp.controllers;

import com.pineapple.pp.entities.User;
import com.pineapple.pp.entities.UserToken;
import com.pineapple.pp.services.SecurityService;
import com.pineapple.pp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SecurityController {

    private UserService userService;

    @Autowired
    public SecurityController(UserService userService){
        this.userService = userService;
    }

    @PostMapping(path="/authenticate")
    @ResponseBody
    public boolean checkToken(@RequestBody String token){
        return SecurityService.checkUserToken(token);
    }

    @GetMapping(path="/authenticate/loggedUserInfo")
    @ResponseBody
    public User getUser(@RequestHeader("authorization")String token){
        UserToken ut = SecurityService.parseToken(token);
        System.out.println("Getting user info for user with token " + ut.getUsername());
        return userService.getUserByToken(ut);
    }
}
