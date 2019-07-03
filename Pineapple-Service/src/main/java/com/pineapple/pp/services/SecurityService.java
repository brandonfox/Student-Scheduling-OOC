package com.pineapple.pp.services;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.entities.UserToken;
import org.springframework.security.crypto.bcrypt.BCrypt;

public class SecurityService {

    private static final String encryptionCode = "We are making a website with the most top of the line security and this code is the most secure code in history";

    private static final Algorithm algorithmHS = Algorithm.HMAC256(encryptionCode);

    public static String createUserAuthenticationToken(User user){
        try {
            System.out.println("Creating authentication token for user " + user.getUsername());
            return JWT.create().withClaim("username", user.getUsername()).withIssuer("PineapplePeople").sign(algorithmHS);
        }catch(JWTCreationException ex){
            ex.printStackTrace();
            return null;
            //TODO Find a better way to handle token creation failure
        }
    }
    public static boolean checkUserToken(String token){
        try {
            JWTVerifier verifier = JWT.require(algorithmHS).withIssuer("PineapplePeople").build();
            DecodedJWT jwt = verifier.verify(token);
            return true;
        }catch(JWTVerificationException ex){
            //Verification failed. Token is invalid
            return false;
        }
    }
    public static boolean isValidCredentials(User user, String attemptedPassword){
        return BCrypt.checkpw(attemptedPassword,user.getPassword());
    }
    public static UserToken parseToken(String token){
        try{
            DecodedJWT jwt = JWT.decode(token);
            return new UserToken(jwt);
        }catch(JWTDecodeException ex){
            //Invalid token
            System.out.println("Got an invalid token");
            return null;
        }
    }
}
