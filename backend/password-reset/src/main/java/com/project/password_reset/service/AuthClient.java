package com.project.password_reset.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(name = "auth-service", url = "${auth.service.url}")
public interface AuthClient {

    @GetMapping("/api/auth/check-emailId")
    void validateUserEmail(@RequestParam("emailId") String emailId);

    @PostMapping("/api/auth/update-password")
    void updatePassword(@RequestBody Map<String, String> data);
}
