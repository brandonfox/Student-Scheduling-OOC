package com.pineapple.pp.controllers;

import com.pineapple.pp.entities.Event;
import com.pineapple.pp.entities.User;
import com.pineapple.pp.entities.UserToken;
import com.pineapple.pp.services.EventService;
import com.pineapple.pp.services.SecurityService;
import com.pineapple.pp.services.UserService;
import com.pineapple.pp.utils.QueryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class EventsController {

    private EventService eventService;
    private UserService userService;

    @Autowired
    public EventsController(EventService eventService, UserService userService) {
        this.eventService = eventService;
        this.userService = userService;
    }

    //TODO Consider categorising events (all, upcoming etc)
    @GetMapping("/events")
    public List<Event> getEvents(@RequestHeader("authorization") String token){
        System.out.println("Retrieved request to get events. Parsing token");
        UserToken userDetails = SecurityService.parseToken(token);
        return eventService.getEventsFor(userDetails);
    }

    @PostMapping("/events")
    public QueryResponse addEvent(@RequestHeader("authorization") String token, @RequestBody String form){
        //Authorization token should be in header
        UserToken userDetails = SecurityService.parseToken(token);
        System.out.print("Adding an event for user " + userDetails.getUsername() + ": ");
        User user = userService.getUser(userDetails);
        Event event = eventService.addEvent(form,user);
        if(event == null){
            //Something went wrong
            //TODO More detailed error report (Check user or event stuff)
            System.out.print("failed..\n");
            return new QueryResponse(false);
        }
        System.out.print("success!\n");
        return new QueryResponse(true);
    }
}
