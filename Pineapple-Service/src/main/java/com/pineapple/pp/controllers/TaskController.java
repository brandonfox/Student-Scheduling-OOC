package com.pineapple.pp.controllers;

import com.pineapple.pp.entities.Event;
import com.pineapple.pp.entities.Task;
import com.pineapple.pp.services.EventService;
import com.pineapple.pp.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TaskController {

    private TaskService taskService;
    private EventService eventService;

    @Autowired
    public TaskController(TaskService taskService, EventService eventService) {
        this.taskService = taskService;
        this.eventService = eventService;
    }

    @PostMapping(path = "/tasks/{title}/{descr}/{eventId}")
    public void add(@PathVariable("title") String title, @PathVariable("descr") String descr, @PathVariable("eventId") Long eventId) {
        Event event = eventService.getEventById(eventId);
        taskService.addWithEvent(event, title, descr);
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

    @DeleteMapping("/tasks/remove-task/{taskId}/{eventId}")
    public void removeTaskById(@PathVariable("taskId") Long taskId, @PathVariable("eventId") Long eventId) {
        System.out.println("in remove task! " + taskId + " event id: " + eventId);
        Event event = eventService.getEventById(eventId);
        List<Task> tasks = taskService.findTasksByEvent(event);
        Task task = null;
        for (Task t : tasks) {
            if (t.getId().compareTo(taskId) == 0) {
                task = t;
                taskService.removeTaskById(task.getId());
            }
        }
    }

    @PutMapping("/tasks/edit-task/{taskId}")
    public void editTask(@PathVariable("taskId") Long taskId, @RequestBody String json) {
        taskService.editTask(taskId, json);
    }
}
