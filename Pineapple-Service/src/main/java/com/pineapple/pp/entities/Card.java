package com.pineapple.pp.entities;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "user")
@EntityListeners(AuditingEntityListener.class)
public class Card {

    @Id
    @GeneratedValue(strategy=IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String status;

    @ManyToMany
    @JoinTable(name = "card_active_users",
            joinColumns = @JoinColumn(name = "card_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users = new HashSet<>();

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description;}
    public String getStatus() { return status; }
    public Set<User> getUsers() { return users; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setStatus(String status) { this.status = status; }
    public void setUsers(Set<User> users) { this.users = users; }
}
