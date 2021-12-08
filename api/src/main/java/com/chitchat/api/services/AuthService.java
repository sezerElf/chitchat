package com.chitchat.api.services;

import com.chitchat.api.auth.ApplicationUserDetailsService;
import com.chitchat.api.auth.AuthRequest;
import com.chitchat.api.auth.AuthResponse;
import com.chitchat.api.dto.CreateUserDto;
import com.chitchat.api.entities.User;
import com.chitchat.api.repositories.UserRepository;
import com.chitchat.api.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final ApplicationUserDetailsService applicationUserDetailsService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    public void register(CreateUserDto createUserDto){
        if(userRepository.existsByEmail(createUserDto.getEmail())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is already registered");
        }

        var newUser = modelMapper.map(createUserDto, User.class);
        newUser.setDateCreated(new Date());
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setRoles("ROLE_USER");

        userRepository.save(newUser);
    }

    public AuthResponse login(AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(),
                            authRequest.getPassword()));
        } catch (BadCredentialsException exception){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Username or password is invalid.");
        }

        var user = userRepository.findByEmail(authRequest.getEmail());

        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        var authResponse = new AuthResponse();
        authResponse.setAccessToken(accessToken);
        authResponse.setRefreshToken(refreshToken);
        authResponse.setUser(user);

        return authResponse;
    }

    public AuthResponse refresh(String refreshToken){
        if(refreshToken.isEmpty()){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token not found");
        }

        var email = jwtUtil.getSubject(refreshToken, "refresh");
        var user = userRepository.findByEmail(email);

        String accessToken = jwtUtil.generateAccessToken(user);
        String newRefreshToken = jwtUtil.generateRefreshToken(user);

        var authResponse = new AuthResponse();
        authResponse.setAccessToken(accessToken);
        authResponse.setRefreshToken(newRefreshToken);
        authResponse.setUser(user);

        return authResponse;
    }
}
