package com.project.todo.service;

import com.project.todo.domain.Users;
import com.project.todo.exception.InvalidCredentialsException;
import com.project.todo.exception.UserAlreadyExistException;
import com.project.todo.exception.UserNotFoundException;
import com.project.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void register(Users users) throws UserAlreadyExistException {
        Optional<Users> existingUser = userRepository.findByEmailId(users.getEmailId());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistException("User already exists. Use a different email ID.");
        }

        users.setPassword(passwordEncoder.encode(users.getPassword()));
        userRepository.save(users);
    }

    @Override
    public Optional<Users> login(String emailId, String password) throws UserNotFoundException, InvalidCredentialsException {
        Optional<Users> user = userRepository.findByEmailId(emailId);

        if (user.isEmpty()) {
            throw new UserNotFoundException("No user found with the provided email.");
        }

        if (!passwordEncoder.matches(password, user.get().getPassword())) {
            throw new InvalidCredentialsException("Incorrect password. Please try again.");
        }

        return user;
    }
}
