package com.pineapple.pp.services;

import com.pineapple.pp.entities.FriendRequest;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.repositories.FriendRequestRepository;
import com.pineapple.pp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@Service
public class FriendService {

    private UserService userService;
    private UserRepository userRepository;
    private FriendRequestRepository fRRepo;

    @Autowired
    public FriendService(UserService userService, UserRepository userRepository, FriendRequestRepository friendRequestRepository){
        this.userService = userService;
        this.userRepository = userRepository;
        fRRepo = friendRequestRepository;
    }

    public Set<User> getFriendsOfUser(User user, String searchParam){
        try{
            //TODO Limit sizes of lists and pages system
            System.out.print("Retrieving friends of token with username: " + user.getUsername());
            Set<User> friends = new HashSet<>(user.getFriends());
            friends.addAll(userRepository.findAllByFriends(user));
            if(searchParam == null || searchParam.equals("undefined")) {
                System.out.print("\n");
                return friends;
            }
            else {
                System.out.print(" and with extra search params: " + searchParam + "\n");
                Set<User> sortedFriends = new HashSet<>();
                friends.iterator().forEachRemaining(x -> {
                    if(x.getUsername().contains(searchParam))
                        sortedFriends.add(x);
                });
                return sortedFriends;
            }

        }catch(NullPointerException ex){
            return null;
        }
    }

    private boolean isAcceptingRequest(User user, User other){
        return fRRepo.findBySendingUserAndRecievingUser(other,user) != null;
    }

    public boolean sendFriendRequest(User user, User requestFriend){
        //TODO Create exceptions
        if(isAcceptingRequest(user,requestFriend)){
            return addFriend(user,requestFriend);
        }
        else {
            System.out.println("Sending friend request for user " + user.getUsername() + ", Request: " + requestFriend.getUsername());
            if (isSameUser(user,requestFriend))
                return false;
            FriendRequest request = new FriendRequest(user, requestFriend);
            fRRepo.save(request);
            return true;
        }
    }

    @Transactional
    public boolean addFriend(User user, User friend){
        System.out.println("Adding friend for user: " + user.getUsername() + " ,Friend: " + friend.getUsername());

        if(isSameUser(user,friend)){
            return false;
        }

        //If is at this step then the user must have been requested by the friend to be a friend
        //The receiver should be user
        FriendRequest oldRequest = fRRepo.findBySendingUserAndRecievingUser(friend,user);
        fRRepo.delete(oldRequest);
        user.addFriend(friend);
        userRepository.save(user);
        return true;
    }

    public boolean removeFriend(User user, User friend){
        System.out.println("Removing friend: " + friend.getUsername() + ", for user: " + user.getUsername());

        if(isSameUser(user,friend))
            return false;
        user.removeFriend(friend);
        userRepository.save(user);
        return true;
    }

    private boolean isSameUser(User user, User user1){
        return user.getUsername().equals(user1.getUsername());
    }

    public boolean denyRequest(User denier, User deniee){
        try {
            FriendRequest request = fRRepo.findBySendingUserAndRecievingUser(deniee, denier);
            fRRepo.delete(request);
            return true;
        }catch(Exception e){
            return false;
        }
    }

    public Set<User> getRequestedFriendsBy(User user){
        Set<FriendRequest> requests = fRRepo.findAllBySendingUser(user);
        Set<User> users = new HashSet<>();
        for (FriendRequest fr:requests) {
            users.add(fr.getRecievingUser());
        }
        return users;
    }

    public Set<User> getUsersWhoRequestedFriendWith(User user){
        Set<FriendRequest> requests = fRRepo.findAllByRecievingUser(user);
        Set<User> users = new HashSet<>();
        for (FriendRequest fr:requests) {
            users.add(fr.getSendingUser());
        }
        return users;
    }

}
