package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;

    private final Gson gson;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, Gson gson) {
        this.taskRepository = taskRepository;
        this.gson = gson;
    }

    @Override
    public TaskRepository getTaskRepository() {
        return taskRepository;
    }

    @Override
    public Gson getGson() { return gson; }
}
