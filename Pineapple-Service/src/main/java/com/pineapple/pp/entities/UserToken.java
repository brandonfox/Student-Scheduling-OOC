package com.pineapple.pp.entities;

import com.auth0.jwt.interfaces.DecodedJWT;

public class UserToken {

    private String username;

    public UserToken(DecodedJWT jwt){
        username = jwt.getClaim("username").asString();
    }

    public String getUsername(){return username;}

}
