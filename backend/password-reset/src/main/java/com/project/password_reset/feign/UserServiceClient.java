package com.project.password_reset.feign;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "auth-service", url = "${user.service.url}")
public interface UserServiceClient {

}
