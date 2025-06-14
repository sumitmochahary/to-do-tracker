package com.project.auth_service.security;

import com.project.auth_service.domain.Users;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtSecurityToken implements SecurityTokenGenerator {

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expiration.ms}")
    private long expirationMs;

    @Override
    public Map<String, String> generateToken(Users users) {
        // Validate user email
        String email = users.getEmailId();
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("User email is required for token generation.");
        }

        // Decode and validate secret key
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        if(keyBytes.length < 32) {
            throw new SecurityException("Secret key must be at least 256 bits (32 bytes) after Base64 decoding");
        }
        SecretKey key = Keys.hmacShaKeyFor(keyBytes);

        // Token expiration
        Date issuedAt = new Date(System.currentTimeMillis());
        Date expireAt = new Date(System.currentTimeMillis() + expirationMs);

        // Build token
        String jwtToken = Jwts
                .builder()
                .header().add("typ","JWT").and()
                .subject(Integer.toString(users.getUserId()))
                .issuedAt(issuedAt)
                .expiration(expireAt)
                .signWith(key, Jwts.SIG.HS256)
                .compact();

        // Return token
        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("issueAt", issuedAt.toString());
        tokenMap.put("expireAt", expireAt.toString());
        tokenMap.put("token", jwtToken);
        return tokenMap;
    }
}
