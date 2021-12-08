package com.chitchat.api.auth;

import com.chitchat.api.entities.User;
import lombok.Data;

@Data
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private User user;
}
