package com.chitchat.api.services;

import com.chitchat.api.dto.CreateUserDto;
import com.chitchat.api.dto.UpdateUserDto;
import com.chitchat.api.entities.User;
import com.chitchat.api.repositories.UserRepository;
import com.chitchat.api.shared.BaseService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements BaseService<User, CreateUserDto, UpdateUserDto> {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void save(CreateUserDto createUserDto) {
        if(userRepository.existsByEmail(createUserDto.getEmail())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is already registered");
        }

        var newUser = modelMapper.map(createUserDto, User.class);
        newUser.setDateCreated(new Date());
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setRoles("ROLE_USER");

        userRepository.save(newUser);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(UUID id) {
        return userRepository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Override
    public void update(UUID id, UpdateUserDto updateUserDto) {
        var user = findById(id);

        if(updateUserDto.getFirstName() != null){
            user.setFirstName(updateUserDto.getFirstName());
        }
        if(updateUserDto.getLastName() != null){
            user.setLastName(updateUserDto.getLastName());
        }
        if(updateUserDto.getEmail() != null && !updateUserDto.getEmail().equals(user.getEmail())) {
            if(userRepository.existsByEmail(updateUserDto.getEmail())){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is already registered");
            }
            user.setEmail(updateUserDto.getEmail());
        }
        if(updateUserDto.getPassword() != null){
            updateUserDto.setPassword(passwordEncoder.encode(updateUserDto.getPassword()));
            user.setPassword(updateUserDto.getPassword());
        }

        userRepository.save(user);
    }

    @Override
    public void delete(UUID id) {
        User user = findById(id);
        userRepository.delete(user);
    }

    public long countAll(){
        return userRepository.count();
    }
}
