package com.pineapple.pp.services;

import com.pineapple.pp.entities.User;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface UserService {
    
    List<User> list();
    
    User add(@RequestBody String json);
    
    User getUser(String json);
    
    User editUser(String json);
    
    User findByEmail(String email);
}
