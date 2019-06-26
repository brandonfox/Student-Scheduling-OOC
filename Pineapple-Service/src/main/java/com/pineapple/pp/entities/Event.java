//package com.pineapple.pp.entities;
//
//import javax.persistence.*;
//import java.util.Date;
//
//import static javax.persistence.GenerationType.IDENTITY;
//
//@Entity
//public class Event {
//
//    @Id
//    @GeneratedValue(strategy=IDENTITY)
//    private Long id;
//
//    private String name;
//
//    private String description;
//
//    private String location;
//
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date startTime;
//
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date endTime;
//
//    @ManyToOne
//    @JoinTable(name = "join_group_event",
//            inverseJoinColumns = @JoinColumn(name = "group_id"),
//            joinColumns = @JoinColumn(name = "event_id")
//    )
//    private UserGroup userGroup = new UserGroup();
//
//    /* Getters and Setters */
//
//    public Long getId() { return id; }
//    public String getName() { return name; }
//    public String getDescription() { return description; }
//    public String getLocation() { return location; }
//    public Date getStartTime() { return startTime; }
//    public Date getEndTime() { return endTime; }
//    public UserGroup getUserGroup() { return userGroup; }
//
//    public void setId(Long id) { this.id = id; }
//    public void setName(String name) { this.name = name; }
//    public void setDescription(String description) { this.description = description; }
//    public void setLocation(String location) { this.location = location; }
//    public void setStartTime(Date startTime) { this.startTime = startTime; }
//    public void setEndTime(Date endTime) { this.endTime = endTime; }
//    public void setUserGroup(UserGroup userGroup) { this.userGroup = userGroup; }
//}
