package com.project.auth_service.controller;

import com.project.auth_service.domain.Users;
import com.project.auth_service.exception.InvalidCredentialsException;
import com.project.auth_service.exception.UserAlreadyExistException;
import com.project.auth_service.exception.UserNotFoundException;
import com.project.auth_service.security.SecurityTokenGenerator;
import com.project.auth_service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final SecurityTokenGenerator securityToken;

    @Autowired
    public AuthController(AuthService authService, SecurityTokenGenerator securityToken) {
        this.authService = authService;
        this.securityToken = securityToken;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users users){
        try{
            // Call service — it will throw exception if user already exists
            authService.register(users);
            // Success response
            return new ResponseEntity<>("Registration successful!", HttpStatus.CREATED);
        } catch (UserAlreadyExistException e){
            // Return JSON error response
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage()); // e.getMessage() will now contain your custom message
            return new ResponseEntity<>(error, HttpStatus.CONFLICT); // 409 Conflict
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users users){
        try {
            Users user = authService.login(users.getEmailId(), users.getPassword()).get(); // Safe to call get() now
            Map<String, String> tokenMap = securityToken.generateToken(user);
            String fullName = user.getUserName();
            String firstName = fullName.split(" ")[0];
            tokenMap.put("message", "Welcome, " + firstName + "!");
            return new ResponseEntity<>(tokenMap, HttpStatus.OK);
        } catch (UserNotFoundException | InvalidCredentialsException e){
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
        } catch (Exception e){
            Map<String, String> error = new HashMap<>();
            error.put("message", "An unexpected error occurred during login.");
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
