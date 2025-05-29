package com.project.todo.service;

import com.project.todo.exception.UserNotFoundException;

public interface PasswordResetService {
    void createPasswordResetToken(String emailId) throws UserNotFoundException;
    void resetPassword(String token, String newPassword);
}
