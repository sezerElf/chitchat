package com.chitchat.api.controllers;

import com.chitchat.api.auth.AuthRequest;
import com.chitchat.api.auth.AuthResponse;
import com.chitchat.api.dto.CreateUserDto;
import com.chitchat.api.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("register")
    public void register(@RequestBody @Valid CreateUserDto createUserDto){
        authService.register(createUserDto);
    }

    @PostMapping("login")
    public AuthResponse login(@RequestBody AuthRequest authRequest, HttpServletResponse response) throws Exception {
        var authResponse = authService.login(authRequest);

        Cookie cookie = new Cookie("refresh_token", authResponse.getRefreshToken());
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);

        return authResponse;
    }

    @PostMapping("refresh")
    public AuthResponse refresh(@CookieValue(value = "refresh_token") String refreshToken, HttpServletResponse response) throws Exception {
        System.out.println(refreshToken);

        var authResponse = authService.refresh(refreshToken);

        Cookie cookie = new Cookie("refresh_token", authResponse.getRefreshToken());
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);

        return authResponse;
    }
}
