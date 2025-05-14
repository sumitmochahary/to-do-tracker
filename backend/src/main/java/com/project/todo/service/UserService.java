package com.project.todo.service;

import com.project.todo.domain.User;
import com.project.todo.exception.UserAlreadyExistException;
import com.project.todo.exception.UserNotFoundException;

public interface UserService {
    void register(User user) throws UserAlreadyExistException;
    User login(String emailId, String password) throws UserNotFoundException;
}
