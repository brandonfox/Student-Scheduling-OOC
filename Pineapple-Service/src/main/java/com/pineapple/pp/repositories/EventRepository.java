package com.pineapple.pp.repositories;

import com.pineapple.pp.entities.Event;
//import com.pineapple.pp.entities.UserGroup;
import com.pineapple.pp.entities.UserGroup;
import com.pineapple.pp.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends CrudRepository<Event, Long> {

    Event findEventById(Long id);

    List<Event> findAllByUserId(Long id);

    List<Event> findEventsByUser(User user);

    void deleteEventById(Long id);

    List<Event> findEventsByUserGroup(UserGroup userGroup);

}
