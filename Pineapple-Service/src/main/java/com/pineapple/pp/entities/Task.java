package com.pineapple.pp.entities;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "task")
@EntityListeners(AuditingEntityListener.class)
public class Task {

    @Id
    @GeneratedValue(strategy=IDENTITY)
    private Long id;

    private String title;

    private String description;

<<<<<<< HEAD
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinTable(name = "event_tasks",
            inverseJoinColumns = @JoinColumn(name = "event_id"),
            joinColumns = @JoinColumn(name = "task_id")
    )
    private Event event;

=======
>>>>>>> parent of 928adc3a... added group-ish
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description;}

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
}
