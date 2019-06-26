package com.pineapple.pp.entities;

import jdk.nashorn.internal.objects.annotations.Getter;
import jdk.nashorn.internal.objects.annotations.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy=IDENTITY)
    private Long id;

    private String username;
//
//    private String name;
//
//    private String hashedPassword;
//
//    private String email;
//
//    private Integer age;
//
//    private Long phoneNumber;

    // todo: Add more credentials if so desired


    // todo: Figure out how to join table AND add an extra column
//    private Set<UserGroup> groups = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "friendship",
            joinColumns = @JoinColumn(name = "user_1"),
            inverseJoinColumns = @JoinColumn(name = "user_2")
    )
    private Set<User> friends = new HashSet<>();

    /* Getters and Setters */

    public Long getId() { return id; }
    public String getUsername() { return username; }
//    public String getName() { return name; }
//    public String getHashedPassword() { return hashedPassword; }
//    public String getEmail() { return email; }
//    public Integer getAge() { return age;}
//    public Long getPhoneNumber() { return phoneNumber; }
//    public Set<User> getFriends() { return friends; }

    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
//    public void setName(String name) { this.name = name; }
//    public void setHashedPassword(String hashedPassword) { this.hashedPassword = hashedPassword; }
//    public void setEmail(String email) { this.email = email; }
//    public void setAge(Integer age) { this.age = age; }
//    public void setPhoneNumber(Long phoneNumber) { this.phoneNumber = phoneNumber; }
//    public void setFriends(Set<User> friends) { this.friends = friends; }
}