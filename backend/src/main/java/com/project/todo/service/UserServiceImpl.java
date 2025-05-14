package com.project.todo.service;

import com.project.todo.domain.User;
import com.project.todo.exception.UserAlreadyExistException;
import com.project.todo.exception.UserNotFoundException;
import com.project.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
    public void register(User user) throws UserAlreadyExistException {
        if (userRepository.existsById(user.getUserId())){
            throw new UserAlreadyExistException();
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public User login(String emailId, String password) throws UserNotFoundException {
        User user = userRepository.findByEmailId(emailId);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())){
            throw new UserNotFoundException();
        }
        return user;
    }
}
