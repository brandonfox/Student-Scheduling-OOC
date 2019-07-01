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
        user.setSalt(BCrypt.gensalt());
        user.setPassword(BCrypt.hashpw(user.getPassword(), user.getSalt()));
        getUserRepository().save(user);
        return user;
    }

    default User getUser(String json) {
        User user = getGson().fromJson(json, User.class);
        if (!getUserRepository().existsByEmail(user.getEmail())) {
            return null;
        }
        return getUserRepository().findByEmail(user.getEmail());
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
