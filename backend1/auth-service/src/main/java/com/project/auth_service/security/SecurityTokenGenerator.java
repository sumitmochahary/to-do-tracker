package com.project.auth_service.security;

import com.project.auth_service.domain.Users;

import java.util.Map;

public interface SecurityTokenGenerator {
    Map<String, String> generateToken(Users users);
}
