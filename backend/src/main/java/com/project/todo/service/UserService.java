package com.project.todo.service;

import com.project.todo.domain.Users;
import com.project.todo.exception.InvalidCredentialsException;
import com.project.todo.exception.UserAlreadyExistException;
import com.project.todo.exception.UserNotFoundException;

import java.util.Optional;

public interface UserService {
    void register(Users users) throws UserAlreadyExistException;
    Optional<Users> login(String emailId, String password) throws UserNotFoundException, InvalidCredentialsException;
}
