package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.entities.Task;
import com.pineapple.pp.repositories.TaskRepository;

import java.util.ArrayList;
import java.util.List;

public interface TaskService {

    default List<Task> list() {
        System.out.println("In list() in TaskService.java");
        List<Task> userList = new ArrayList<>();
        for (Task task : getTaskRepository().findAll()) {
            System.out.println(task.getTitle());
            userList.add(task);
        }
        return userList;
    }

    TaskRepository getTaskRepository();

    Gson getGson();

    default Task add(String json) {
        Task task = getGson().fromJson(json, Task.class);
        getTaskRepository().save(task);
        return task;
    }

    default Task editTask(String json) {
        Task task = getGson().fromJson(json, Task.class);
        Task taskFromDB = getTaskRepository().findTaskById(task.getId());
        taskFromDB.setTitle(task.getTitle());
        taskFromDB.setDescription(task.getDescription());
        getTaskRepository().save(taskFromDB);
        return taskFromDB;
    }

    // todo: remove task
}
