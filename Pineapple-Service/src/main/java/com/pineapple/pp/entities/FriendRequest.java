package com.pineapple.pp.entities;

import javax.persistence.*;

@IdClass(FriendRequestPK.class)
@Entity
public class FriendRequest {

    public FriendRequest(){
        
    }

    @OneToOne
    @JoinColumn(name="sender_user")
    @Id
    private User sendingUser;

    @OneToOne
    @JoinColumn(name="reciever_user")
    @Id
    private User recievingUser;

    public FriendRequest(User sendingUser, User recievingUser){
        this.sendingUser = sendingUser;
        this.recievingUser = recievingUser;
    }

    public User getSendingUser(){return sendingUser;}
    public User getRecievingUser(){ return recievingUser; }

    public void setSendingUser(User user){sendingUser = user;}
    public void setRecievingUser(User user){ recievingUser = user;}

}
