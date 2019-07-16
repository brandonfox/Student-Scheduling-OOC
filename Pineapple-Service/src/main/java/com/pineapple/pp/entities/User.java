package com.pineapple.pp.entities;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "user")
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy=IDENTITY)
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String password;
    private String email;
    private Integer age;
    private Long phoneNumber;


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
    public String getFirstname() { return firstname; }
    public String getPassword() { return password; }
    public String getEmail() { return email; }
    public Integer getAge() { return age;}
    public Long getPhoneNumber() { return phoneNumber; }
    public Set<User> getFriends() { return friends; }
    public String getLastname() {
        return lastname;
    }
    
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setFirstname(String firstname) { this.firstname = firstname; }
    public void setPassword(String password) { this.password = password; }
    public void setEmail(String email) { this.email = email; }
    public void setAge(Integer age) { this.age = age; }
    public void setPhoneNumber(Long phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setFriends(Set<User> friends) { this.friends = friends; }
    public void addFriend(User friend){ friends.add(friend); }
}
