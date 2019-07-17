package com.pineapple.pp.repositories;

import com.pineapple.pp.entities.FriendRequest;
import com.pineapple.pp.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface FriendRequestRepository extends CrudRepository<FriendRequest, Long> {

    Set<FriendRequest> findAllByRecievingUserOrSendingUser(User receiver, User sender);

    FriendRequest findBySendingUserAndRecievingUser(User sender, User reciever);

    Set<FriendRequest> findAllBySendingUser(User sender);

    Set<FriendRequest> findAllByRecievingUser(User user);

}
