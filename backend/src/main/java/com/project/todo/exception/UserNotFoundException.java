package com.project.todo.exception;

public class UserNotFoundException extends Exception {
    public UserNotFoundException() {
        super("User not found with the provided email.");
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
