package com.project.auth_service.service;

import com.project.auth_service.domain.Users;
import com.project.auth_service.exception.InvalidCredentialsException;
import com.project.auth_service.exception.UserAlreadyExistException;
import com.project.auth_service.exception.UserNotFoundException;

import java.util.Optional;

public interface AuthService {
    void register(Users users) throws UserAlreadyExistException;
    Optional<Users> login(String emailId, String password) throws UserNotFoundException, InvalidCredentialsException;
}
