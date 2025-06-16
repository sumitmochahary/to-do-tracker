package com.project.password_reset;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PasswordResetApplication {

	public static void main(String[] args) {
		SpringApplication.run(PasswordResetApplication.class, args);
	}

}
