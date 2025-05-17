package com.project.todo.service;
import com.project.todo.domain.Users;
import java.util.Map;

public interface SecurityTokenGenerator {
    Map<String, String> generateToken(Users users);
}
