package com.project.password_reset.service;

import com.project.password_reset.domain.PasswordResetToken;
import com.project.password_reset.exception.InvalidTokenException;
import com.project.password_reset.exception.TokenExpiredException;
import com.project.password_reset.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
public class PasswordResetServiceImpl implements PasswordResetService{

    @Autowired
    private PasswordResetTokenRepository tokenRepo;

    @Autowired
    private AuthClient authClient;

    @Autowired
    private EmailService emailService;

    @Override
    public void createPasswordResetToken(String emailId) {
        authClient.validateUserEmail(emailId); // Feign call

        String token = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(5);
        PasswordResetToken resetToken = new PasswordResetToken(token, expiry, emailId);
        tokenRepo.save(resetToken);

        emailService.sendResetLink(emailId, token);
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepo.findByToken(token)
                .orElseThrow(() -> new InvalidTokenException("Invalid token"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new TokenExpiredException("Token expired");
        }

        authClient.updatePassword(Map.of(
                "email", resetToken.getEmail(),
                "password", newPassword
        ));

        tokenRepo.delete(resetToken);
    }
}
