package com.project.password_reset.controller;

import com.project.password_reset.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/password-reset")
public class PasswordResetController {
    @Autowired
    private PasswordResetService resetService;

    @PostMapping("/request")
    public ResponseEntity<String> requestReset(@RequestBody Map<String, String> body) {
        resetService.createPasswordResetToken(body.get("email"));
        return ResponseEntity.ok("Reset link sent to email.");
    }

    @PostMapping("/confirm")
    public ResponseEntity<String> confirmReset(@RequestBody Map<String, String> body) {
        resetService.resetPassword(body.get("token"), body.get("newPassword"));
        return ResponseEntity.ok("Password reset successful.");
    }
}
