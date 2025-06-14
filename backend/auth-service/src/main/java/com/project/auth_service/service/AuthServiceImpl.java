package com.project.auth_service.service;

import com.project.auth_service.domain.Users;
import com.project.auth_service.exception.InvalidCredentialsException;
import com.project.auth_service.exception.UserAlreadyExistException;
import com.project.auth_service.exception.UserNotFoundException;
import com.project.auth_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void register(Users users) throws UserAlreadyExistException {
        Optional<Users> user = userRepository.findByEmailId(users.getEmailId());

        if(user.isPresent()){
            throw new UserAlreadyExistException("User already exists. Use a different email Id.");
        }

        users.setPassword(passwordEncoder.encode(users.getPassword()));
        userRepository.save(users);
    }

    @Override
    public Optional<Users> login(String emailId, String password) throws UserNotFoundException, InvalidCredentialsException {
        Optional<Users> user = userRepository.findByEmailId(emailId);

        if(user.isEmpty()){
            throw new InvalidCredentialsException("No user found with the provided email.");
        }

        if(!passwordEncoder.matches(password, user.get().getPassword())){
            throw new InvalidCredentialsException("Incorrect password. Please try again.");
        }

        return user;
    }
}
