package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.ArrayList;
import java.util.List;

public interface UserService {

    default List<User> list() {
        List<User> userList = new ArrayList<>();
        for (User user : getUserRepository().findAll()) {
            if (user != null) {
                userList.add(user);
            }
        }
        return userList;
    }

    UserRepository getUserRepository();

    Gson getGson();

    default User add(String json) {
        User user = getGson().fromJson(json, User.class);
        if (getUserRepository().existsByEmail(user.getEmail()) || getUserRepository().existsByUsername(user.getUsername())) {
            return null;
        }
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        getUserRepository().save(user);
        return user;
    }

    default User getUser(String json) {
        User user = getGson().fromJson(json, User.class);
        if(getUserRepository().existsByEmail(user.getUsername())) {
            return getUserRepository().findByEmail(user.getUsername());
        }
        else if(getUserRepository().existsByUsername(user.getUsername())) {
            return getUserRepository().findByUsername(user.getUsername());
        }
        return null;
    }

    default User editUser(String json) {
        User user = getGson().fromJson(json, User.class);
        User userFromDB = getUserRepository().findUserById(user.getId());
        userFromDB.setEmail(user.getEmail());
        getUserRepository().save(userFromDB);
        return userFromDB;
    }

    default User findByEmail(String email) {
        return getUserRepository().findByEmail(email);
    }
}
