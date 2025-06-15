package com.project.password_reset.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String token;

    private LocalDateTime expiryDate;

    private String userId;

    public PasswordResetToken() {
    }

    public PasswordResetToken(int id, String token, LocalDateTime expiryDate, String userId) {
        this.id = id;
        this.token = token;
        this.expiryDate = expiryDate;
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public String getUserId() {
        return userId;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}