package com.pineapple.pp.controllers;

import com.pineapple.pp.entities.Task;
import com.pineapple.pp.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    private TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping(path = "/create-task")
    public void add(@RequestBody String json) {
        System.out.print("Creating new task " + json + "... ");
        Task task = taskService.add(json);
        if (task == null) { System.out.println("Task creation failed"); }
        else System.out.println("Task created!");
    }

    @GetMapping("/tasks")
    public Iterable<Task> findAll() {
        System.out.println("Retrieving all tasks");
        return taskService.list();
    }

    @PostMapping("/edit-task")
    public Task editTask(@RequestBody String json) {
        return taskService.editTask(json);
    }
}
