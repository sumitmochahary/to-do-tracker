package com.project.todo.service;

public interface EmailService {
    void sendMail(String to, String subject, String body);
}
