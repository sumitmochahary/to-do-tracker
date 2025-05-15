package com.project.todo.controller;

import com.project.todo.domain.Users;
import com.project.todo.exception.UserAlreadyExistException;
import com.project.todo.exception.UserNotFoundException;
import com.project.todo.service.SecurityTokenGenerator;
import com.project.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class UserController {
    private final UserService userService;
    private final SecurityTokenGenerator securityToken;

    @Autowired
    public UserController(UserService userService, SecurityTokenGenerator securityToken) {
        this.userService = userService;
        this.securityToken = securityToken;
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody Users users) throws UserAlreadyExistException{
        userService.register(users);
        return new ResponseEntity<>("Users register successfully", HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody Users users) throws UserNotFoundException{

        Map<String, String> map = null;
        ResponseEntity<?> responseEntity;

        Users user = userService.login(users.getEmailId(), users.getPassword());

        if(user != null) {
            map = securityToken.generateToken(user);
            responseEntity = new ResponseEntity<>(map, HttpStatus.OK);
        } else{
            responseEntity = new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
        return responseEntity;
    }
}
