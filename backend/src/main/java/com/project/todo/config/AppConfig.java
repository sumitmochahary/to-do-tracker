package com.project.todo.config;

import com.project.todo.filter.JwtFilter;
import jakarta.servlet.Filter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class AppConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public FilterRegistrationBean<JwtFilter> filterRegistrationBean(@Value("${jwt.secret-key}") String secretKey){
        FilterRegistrationBean<JwtFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new JwtFilter(secretKey));
        registrationBean.addUrlPatterns("/api/v1/*");
        registrationBean.setOrder(1); // After CORS filter
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<Filter> corsFilter() {
        FilterRegistrationBean<Filter> registrationBean = new FilterRegistrationBean<>();

        Filter filter = (request, response, chain) -> {
            HttpServletResponse res = (HttpServletResponse) response;
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            chain.doFilter(request, response);
        };

        registrationBean.setFilter(filter);
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(0); // Highest priority
        return registrationBean;
    }
}
