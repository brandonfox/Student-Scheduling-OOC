package com.pineapple.pp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.commons.lang3.time.DateUtils;

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
    
    @Basic
    private String startTime;
    
    @Basic
    private String endTime;
    
    private Boolean allDay;

    @OneToMany(cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JoinTable(name = "event_tasks",
            inverseJoinColumns = @JoinColumn(name = "task_id"),
            joinColumns = @JoinColumn(name = "event_id")
    )
    @JsonIgnore
    private List<Task> tasks;


    @ManyToOne
    @JoinTable(name = "join_group_event",
            inverseJoinColumns = @JoinColumn(name = "group_id"),
            joinColumns = @JoinColumn(name = "event_id")
    )
    private UserGroup userGroup;



    /* Getters and Setters */

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getLocation() { return location; }
    public Date getStartDate() { return startDate; }
    public Date getEndDate() { return endDate; }
    public User getUser(){ return user; }
    public List<Task> getTasks() { return tasks; }
    public String getStartTime() { return startTime; }
    public String getEndTime() { return endTime; }
    public Boolean getAllDay() { return allDay; }

    public UserGroup getUserGroup() {
        return userGroup;
    }

    public void setAllDay(Boolean allDay) { this.allDay = allDay; }
    public void setStartTime(String startTime) { this.startTime = startTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setLocation(String location) { this.location = location; }
    public void setStartDate(Date startDate) {
        startDate = DateUtils.addDays(startDate, 1);
        this.startDate = startDate; }
    public void setEndDate(Date endDate) {
        endDate = DateUtils.addDays(endDate, 1);
        this.endDate = endDate; }
    public void setUser(User user){this.user = user;}
    public void setTasks(List<Task> tasks) { this.tasks = tasks; }

    public void setUserGroup(UserGroup userGroup) {
        this.userGroup = userGroup;
    }
}
