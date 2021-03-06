package com.pineapple.pp.repositories;

import com.pineapple.pp.entities.Event;
import com.pineapple.pp.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource
public interface TaskRepository extends JpaRepository<Task, Long> {

    Task findTaskById(Long id);

    boolean existsById(Long id);

    List<Task> findTasksByEvent(Event event);

    void deleteTaskById(Long id);
}
