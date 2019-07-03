package com.pineapple.pp.controllers;
//
import com.pineapple.pp.repositories.EventRepository;
//import com.pineapple.pp.repositories.GroupRepository;
import com.pineapple.pp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class OrmController {
//
    @Autowired
    private EventRepository eventRepository;

//    @Autowired
//    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;
}
