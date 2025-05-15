package com.project.todo.service;

import com.project.todo.domain.Users;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtSecurityTokenGenerator implements SecurityTokenGenerator{
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expiration.ms}")
    private long expirationMs;

    @Override
    public Map<String, String> generateToken(Users users) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        SecretKey key = Keys.hmacShaKeyFor(keyBytes);

        Date expiryDate = new Date(System.currentTimeMillis() + expirationMs);

        String jwtToken = Jwts
                .builder()
                .subject(users.getEmailId())
                .issuedAt(new Date())
                .expiration(expiryDate)
                .signWith(key)
                .compact();

        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("token", jwtToken);
        return tokenMap;
    }
}
