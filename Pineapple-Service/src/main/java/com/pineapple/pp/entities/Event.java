package com.pineapple.pp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy=IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String location;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    @OneToMany
    @JoinTable(name = "event_tasks",
            inverseJoinColumns = @JoinColumn(name = "task_id"),
            joinColumns = @JoinColumn(name = "event_id")
    )
    @JsonIgnore
    private List<Task> tasks;


//    @ManyToOne
//    @JoinTable(name = "join_group_event",
//            inverseJoinColumns = @JoinColumn(name = "group_id"),
//            joinColumns = @JoinColumn(name = "event_id")
//    )
//    private UserGroup userGroup = new UserGroup();



    /* Getters and Setters */

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getLocation() { return location; }
    public Date getStartDate() { return startDate; }
    public Date getEndDate() { return endDate; }
    public User getUser(){ return user; }
    public List<Task> getTasks() { return tasks; }

//    public UserGroup getUserGroup() { return userGroup; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setLocation(String location) { this.location = location; }
    public void setStartDate(Date startDate) { this.startDate = startDate; }
    public void setEndDate(Date endDate) { this.endDate = endDate; }
    public void setUser(User user){this.user = user;}
    public void setTasks(List<Task> tasks) { this.tasks = tasks; }
//    public void setUserGroup(UserGroup userGroup) { this.userGroup = userGroup; }
}
