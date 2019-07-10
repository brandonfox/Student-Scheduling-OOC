package com.pineapple.pp.repositories;

import com.pineapple.pp.entities.Event;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.entities.UserGroup;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends CrudRepository<Event, Long> {

    List<Event> findAllByUserId(Long id);

    List<Event> findAllByUser(User user);

    List<Event> findEventsByUserGroup(UserGroup userGroup);

}
