package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.entities.Event;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.entities.UserToken;
import com.pineapple.pp.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    
    private final EventRepository eventRepository;
    private final UserService userService;
    private final Gson gson;
    
    @Autowired
    public EventService(EventRepository eventRepo, UserService userRepo){
        eventRepository = eventRepo;
        userService = userRepo;
        this.gson = new Gson();
    }
    
    /**
     * Get all events for a specific user
     * @param identificationString username or email of user
     * @return a list of events for user
     */
    public List<Event> getEventsFor(String identificationString){
        System.out.println("Retrieving events for '" + identificationString + "'");
        User user = userService.getUserFromJson(identificationString);
        return eventRepository.findAllByUser(user);
    }
    /**
     * Get all events for a specific user
     * @param token The token of a specific user
     * @return a list of events for user
     */
    public List<Event> getEventsFor(UserToken token){
        try {
            System.out.println("Retrieving events for user " + token.getUsername());
            return eventRepository.findAllByUser(userService.getUser(token));
        }catch(NullPointerException ex) {
            return null;
        }
    }
    
    public Event addEvent(String json, User user){
        Event event = gson.fromJson(json,Event.class);
        //TODO Add system for checking event conflicts or ignore (If multiple events are a thing)
        event.setUser(user);
        eventRepository.save(event);
        return event;
    }
    
}
