package com.pineapple.pp.controllers;

import com.pineapple.pp.entities.Event;
import com.pineapple.pp.entities.Task;
import com.pineapple.pp.services.EventService;
import com.pineapple.pp.services.TaskService;
import com.pineapple.pp.services.TaskServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Null;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    private TaskServiceImpl taskService;
    private EventService eventService;

    @Autowired
    public TaskController(TaskServiceImpl taskService, EventService eventService) {
        this.taskService = taskService;
        this.eventService = eventService;
    }

    @PostMapping(path = "/tasks")
    public void add(@RequestBody String json) {
        System.out.print("Creating new task " + json + "... ");
        Task task = taskService.add(json);
        if (task == null) { System.out.println("Task creation failed"); }
        else System.out.println("Task created!");
    }

    @GetMapping("/tasks/by-event/{eventId}")
    public List<Task> findTasksByEvent(@PathVariable("eventId") Long eventId) {
        try {
            Event event = eventService.getEventById(eventId);
            System.out.println("Retrieving all tasks by event: " + event.getId() + " " + event.getName());
            return taskService.findTasksByEvent(event);
        } catch (NullPointerException ex) {
            return null;
        }
    }

    @PostMapping("/edit-task")
    public Task editTask(@RequestBody String json) {
        return taskService.editTask(json);
    }
}
