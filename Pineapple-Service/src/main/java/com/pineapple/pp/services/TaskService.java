package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.entities.Event;
import com.pineapple.pp.entities.Task;
import com.pineapple.pp.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private Gson gson;

    public List<Task> findTasksByEvent(Event event) {
        return this.taskRepository.findTasksByEvent(event);
    }

    public Task add(String json) {
        Task task = this.gson.fromJson(json, Task.class);
        this.taskRepository.save(task);
        return task;
    }

    public void addWithEvent(Event event, String title, String descr) {
        Task task = new Task();
        task.setEvent(event);
        task.setTitle(title);
        task.setDescription(descr);
        System.out.println(task.getTitle());
        taskRepository.save(task);
    }

    @Transactional
    public Task editTask(Long taskId, String json) {
        Task task = this.gson.fromJson(json, Task.class);
        Task taskFromDB = this.taskRepository.findTaskById(taskId);
        taskFromDB.setTitle(task.getTitle());
        taskFromDB.setDescription(task.getDescription());
        this.taskRepository.save(taskFromDB);
        return taskFromDB;
    }

    @Transactional
    public void removeTaskById(Long id) {
        System.out.println("task id: " + id);
        if (taskRepository.existsById(id)) {
            this.taskRepository.deleteTaskById(id);
        } else {
            System.out.println("no such id");
        }
//        this.taskRepository.deleteTaskById(id);
    }
}
