package com.project.password_reset.service;

public interface PasswordResetService {
    void createPasswordResetToken(String emailId);
    void resetPassword(String token, String newPassword);
}
