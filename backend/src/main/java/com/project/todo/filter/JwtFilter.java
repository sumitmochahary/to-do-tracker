package com.project.todo.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
    private final String secretKey;

    public JwtFilter(String secretKey) {
        this.secretKey = secretKey;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if(authHeader != null && authHeader.startsWith("Bearer ")){
            String token = authHeader.substring(7);

            try{
                byte[] keyBytes = Decoders.BASE64.decode(secretKey);
                if(keyBytes.length < 32){
                    throw new SecurityException("Invalid key length");
                }

                SecretKey key = Keys.hmacShaKeyFor(keyBytes);
                // Parse and validate token
                Claims claims = Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

                // Validate subject claim
                String emailId = claims.getSubject();
                if(emailId == null || emailId.isBlank()){
                    sendError(response, "Authentication failed");
                    return;
                }

                request.setAttribute("EmailId", emailId);
                filterChain.doFilter(request, response);
            } catch (ExpiredJwtException ex) {
                logger.warn("Expired JWT: {}", ex.getMessage());
                sendError(response, "Authentication failed");
            } catch (JwtException | IllegalArgumentException ex){
                logger.error("Invalid JWT: {}", ex.getMessage());
                sendError(response, "Authentication failed");
            } catch (SecurityException ex){
                logger.error("Key validation failed: {}", ex.getMessage());
                sendError(response, "Authentication failed");
            }
        } else {
            sendError(response, "Authentication required");
        }
    }
    private void sendError(HttpServletResponse response, String message) throws IOException{
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(message);
        response.getWriter().flush();
    }
}
