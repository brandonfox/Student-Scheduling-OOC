package com.pineapple.pp.repositories;

import com.pineapple.pp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Long> {
    
    User findByEmail(String email);
    
    User findUserById(Long id);

    User findByUsername(String username);
    
    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    List<User> findAllByFriends(User user);

    List<User> findUsersByUsernameContains(String contains);

}
