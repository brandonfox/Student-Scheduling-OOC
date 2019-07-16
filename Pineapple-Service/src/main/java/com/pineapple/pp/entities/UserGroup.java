//package com.pineapple.pp.entities;
//
//import javax.persistence.*;
//import java.util.HashSet;
//import java.util.Set;
//
//import static javax.persistence.GenerationType.IDENTITY;
//
//@Entity
//public class UserGroup {
//
//    @Id
//    @GeneratedValue(strategy=IDENTITY)
//    private Long id;
//
//    private String name;
//
//    private String description;
//
//    @OneToMany
//    @JoinTable(name = "join_group_event",
//            joinColumns = @JoinColumn(name = "group_id"),
//            inverseJoinColumns = @JoinColumn(name = "event_id")
//    )
//    private Set<Event> events = new HashSet<>();
//
//    /* Getters and Setters */
//
//    public Long getId() { return id; }
//    public String getFirstname() { return name; }
//    public String getDescription() { return description; }
//    public Set<Event> getEvents() { return events; }
//
//    public void setId(Long id) { this.id = id; }
//    public void setFirstname(String name) { this.name = name; }
//    public void setDescription(String description) { this.description = description; }
//    public void setEvents(Set<Event> events) { this.events = events; }
//}
