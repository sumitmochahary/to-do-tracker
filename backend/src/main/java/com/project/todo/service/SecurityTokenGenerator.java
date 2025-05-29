package com.project.todo.service;
import com.project.todo.domain.Users;
import java.util.Map;
import java.util.Optional;

public interface SecurityTokenGenerator {
    Map<String, String> generateToken(Optional<Users> users);
}
