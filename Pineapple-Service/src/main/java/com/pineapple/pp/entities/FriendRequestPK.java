package com.pineapple.pp.entities;


import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class FriendRequestPK implements Serializable { // Primary key for friend request

    private long sendingUser;
    private long recievingUser;

    public FriendRequestPK(long sender, long reciever){
        this.sendingUser = sender;
        this.recievingUser = reciever;
    }
    public FriendRequestPK(){

    }

    public long getSendingUser(){return sendingUser;}
    public long getRecievingUser(){ return recievingUser;}

    public void setSendingUser(long user){sendingUser = user;}
    public void setRecievingUser(long user){recievingUser = user;}

    public boolean contains(long user){
        return sendingUser == user || recievingUser == user;
    }

    @Override
    public boolean equals(Object obj) {
        if(obj.getClass() == this.getClass()) {
            FriendRequestPK other = (FriendRequestPK) obj;
            return other.contains(sendingUser) && other.contains(recievingUser);
        }return false;
    }

}