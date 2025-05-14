package com.project.todo.controller;

import com.project.todo.domain.User;
import com.project.todo.exception.UserAlreadyExistException;
import com.project.todo.exception.UserNotFoundException;
import com.project.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody User user) throws UserAlreadyExistException{
        userService.register(user);
        return new ResponseEntity<>("User register successfully", HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody User user) throws UserNotFoundException{
        User loggedInUser = userService.login(user.getEmailId(), user.getPassword());
        return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
    }
}
