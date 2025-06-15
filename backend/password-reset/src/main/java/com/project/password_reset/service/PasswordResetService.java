package com.project.password_reset.service;

import com.project.password_reset.exception.UserNotFoundException;

public interface PasswordResetService {
    void createPasswordResetToken(String emailId) throws UserNotFoundException;
    void resetPassword(String token, String newPassword);
}