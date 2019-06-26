package com.pineapple.pp.controllers;

import com.pineapple.pp.entities.User;
import com.pineapple.pp.exception.ResourceNotFoundException;
import com.pineapple.pp.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class UserController {
    private UserRepository repository;
    
    public UserController(UserRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping("/users")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<User> getAllUsers() {
        return repository.findAll();
    }
    
    @PostMapping("/users")
    public User createNote(@Valid @RequestBody User user) {
        return repository.save(user);
    }
    
    @GetMapping("/users/{id}")
    public User getNoteById(@PathVariable(value = "id") Long noteId) {
        return repository.findById(noteId)
            .orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteId));
    }
    
    @PutMapping("/users/{id}")
    public User updateNote(@PathVariable(value = "id") Long userId,
                           @Valid @RequestBody User userDetails) {
        
        User user = repository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("Note", "id", userId));
        
        user.setUsername(userDetails.getUsername());
    
        return repository.save(user);
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable(value = "id") Long userId) {
        User user = repository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("Note", "id", userId));
        
        repository.delete(user);
        
        return ResponseEntity.ok().build();
    }
}
