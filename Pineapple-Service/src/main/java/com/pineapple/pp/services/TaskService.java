package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.entities.Event;
import com.pineapple.pp.entities.Task;
import com.pineapple.pp.repositories.TaskRepository;

import java.util.ArrayList;
import java.util.List;

public interface TaskService {

    TaskRepository getTaskRepository();

    default List<Task> findTasksByEvent(Event event) {
        return getTaskRepository().findTasksByEvent(event);
    }

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

    default void removeTaskById(Long id) {
        getTaskRepository().deleteTaskById(id);
    }
}
