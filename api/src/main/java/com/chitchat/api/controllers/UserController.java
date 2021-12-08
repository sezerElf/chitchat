package com.chitchat.api.controllers;

import com.chitchat.api.dto.CreateUserDto;
import com.chitchat.api.dto.UpdateUserDto;
import com.chitchat.api.entities.User;
import com.chitchat.api.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("users")
public class UserController {
    private final UserService userService;

    @GetMapping
    public List<User> findAll(){
        return userService.findAll();
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable UUID id){
        userService.delete(id);
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable UUID id){
         return userService.findById(id);
    }

    @PutMapping("{id}")
    public void update(@RequestBody UpdateUserDto updateUserDto ,@PathVariable UUID id){
        userService.update(id,updateUserDto);
    }

    @GetMapping("count")
    public long countAll(){
        return userService.countAll();
    }
}
