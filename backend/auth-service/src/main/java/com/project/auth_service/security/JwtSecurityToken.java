package com.project.auth_service.security;

import com.project.auth_service.domain.Users;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class JwtSecurityToken implements SecurityTokenGenerator {
    @Override
    public Map<String, String> generateToken(Users users) {
        return Map.of();
    }
}
