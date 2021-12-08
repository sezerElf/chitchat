package com.chitchat.api.utils;

import com.chitchat.api.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtUtil {
    private final String accessSecret = "Lw8QXhbDppp83wY8as1u9JILJMaFoxqT";
    private final String refreshSecret = "Mu7joCua16ZY9g3pxpOTT9wh9LmlPBYa";

    public String generateAccessToken(User user){
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 6))
                .signWith(Keys.hmacShaKeyFor(accessSecret.getBytes())).compact();
    }

    public String generateRefreshToken(User user){
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 48))
                .signWith(Keys.hmacShaKeyFor(refreshSecret.getBytes())).compact();
    }

    private Claims parseClaims(String token, String type) {
        String secret = "";
        if(type == "access") {
            secret = accessSecret;
        }else if(type == "refresh"){
            secret = refreshSecret;
        }

        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes())).build()
                .parseClaimsJws(token).getBody();
    }

    public String getSubject(String token, String type){
        return parseClaims(token, type).getSubject();
    }
    private Date getExpiration(String token, String type) {
        return parseClaims(token, type).getExpiration();
    }

    private boolean isTokenExpired(String token, String type) {
        return getExpiration(token, type).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails, String type) {
        final String email = getSubject(token, type);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token, type);
    }
}
