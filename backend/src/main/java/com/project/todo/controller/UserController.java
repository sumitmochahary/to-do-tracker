package com.project.todo.controller;

import com.project.todo.domain.Users;
import com.project.todo.exception.InvalidCredentialsException;
import com.project.todo.exception.UserAlreadyExistException;
import com.project.todo.exception.UserNotFoundException;
import com.project.todo.service.SecurityTokenGenerator;
import com.project.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class UserController {
    private final UserService userService;
    private final SecurityTokenGenerator securityToken;

    @Autowired
    public UserController(UserService userService, SecurityTokenGenerator securityToken) {
        this.userService = userService;
        this.securityToken = securityToken;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users users) throws UserAlreadyExistException{
        userService.register(users);
        return new ResponseEntity<>("User register successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users users) throws UserNotFoundException, InvalidCredentialsException {
        Optional<Users> userOptional = userService.login(users.getEmailId(), users.getPassword());

        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            Map<String, String> tokenMap = securityToken.generateToken(user);
            return new ResponseEntity<>(tokenMap, HttpStatus.OK);
        } else {
            throw new InvalidCredentialsException();
        }
    }
}
