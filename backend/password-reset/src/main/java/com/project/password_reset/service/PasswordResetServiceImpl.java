package com.project.password_reset.service;

import com.project.password_reset.domain.PasswordResetToken;
import com.project.password_reset.domain.Users;
import com.project.password_reset.exception.InvalidTokenException;
import com.project.password_reset.exception.TokenExpiredException;
import com.project.password_reset.exception.UserNotFoundException;
import com.project.password_reset.repository.PasswordResetTokenRepository;
import com.project.password_reset.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetServiceImpl implements PasswordResetService{

    @Value("${frontend.reset.url}")
    private String frontendResetUrl;

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Autowired
    public PasswordResetServiceImpl(UserRepository userRepository, PasswordResetTokenRepository tokenRepository, BCryptPasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Override
    public void createPasswordResetToken(String emailId) throws UserNotFoundException {
        Users user = userRepository.findByEmailId(emailId).orElseThrow(() -> new UserNotFoundException("User with email " + emailId + " not found."));
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(5));

        tokenRepository.save(resetToken);

        String resetLink = frontendResetUrl + "/reset-password?token=" + token;
        emailService.sendMail(emailId,"Password reset", "Click here to reset your password:" + resetLink);
    }

    @Transactional
    @Override
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new InvalidTokenException("The reset token is invalid."));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new TokenExpiredException("The reset token has expired. Please request a new one.");
        }

        Users user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(resetToken);
    }

}
