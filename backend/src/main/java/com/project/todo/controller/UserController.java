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

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
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
    public ResponseEntity<?> register(@RequestBody Users users) {
        try {
            // Call service — it will throw exception if user already exists
            userService.register(users);
            // Success response
            return new ResponseEntity<>("Registration successful!", HttpStatus.CREATED);
        } catch (UserAlreadyExistException e) {
            // Return JSON error response
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage()); // e.getMessage() will now contain your custom message
            return new ResponseEntity<>(error, HttpStatus.CONFLICT); // 409 Conflict
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users users) {
        try {
            Optional<Users> userOptional = userService.login(users.getEmailId(), users.getPassword());

            if (userOptional.isPresent()) {
                Users user = userOptional.get();
                Map<String, String> tokenMap = securityToken.generateToken(user);
                return new ResponseEntity<>(tokenMap, HttpStatus.OK);
            } else {
                // This path should technically never be reached because the service throws exception already
                throw new InvalidCredentialsException("Invalid credentials");
            }

        } catch (UserNotFoundException | InvalidCredentialsException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            // fallback for unexpected errors
            Map<String, String> error = new HashMap<>();
            error.put("message", "An unexpected error occurred during login.");
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
